const amqp = require('amqplib');
const { GX_BE_PROASIG_URL } = require('../configs/config');

class RabbitMQService {
    constructor() {
        this.connection = null;
        this.channel = null;
        this.rabbitMQUrl = process.env.RABBITMQ_URL || 'amqp://rabbitmq:5672';
        this.maxRetries = 30;
        this.retryInterval = 5000;
        this.maxRetryAttempts = 3;
        
        // Colas de prioridad
        this.queues = {
            HIGH_PRIORITY: 'proasig_high_priority',
            NORMAL_PRIORITY: 'proasig_normal_priority', 
            LOW_PRIORITY: 'proasig_low_priority',
            ERROR_QUEUE: 'proasig_error'
        };
        
        // Estado de mensajes
        this.messageStatus = new Map();
        this.responseHandlers = new Map();
    }

    async connect(retryCount = 0) {
        try {
            console.log(`🔌 [RabbitMQ] Conectando... (intento ${retryCount + 1}/${this.maxRetries})`);
            this.connection = await amqp.connect(this.rabbitMQUrl);
            this.channel = await this.connection.createChannel();
            
            // Crear todas las colas
            for (const queue of Object.values(this.queues)) {
                await this.channel.assertQueue(queue, {
                    durable: true,
                    arguments: {
                        'x-message-ttl': 86400000, // 24 horas
                        'x-dead-letter-exchange': '',
                        'x-dead-letter-routing-key': this.queues.ERROR_QUEUE
                    }
                });
            }
            
            console.log('✅ [RabbitMQ] Conectado exitosamente');
            await this.startConsumers();
            return true;
        } catch (error) {
            console.error('❌ [RabbitMQ] Error de conexión:', error.message);
            if (retryCount < this.maxRetries) {
                console.log(`🔄 Reintentando en ${this.retryInterval/1000} segundos...`);
                await new Promise(resolve => setTimeout(resolve, this.retryInterval));
                return this.connect(retryCount + 1);
            }
            throw error;
        }
    }

    determinePriority(operation) {
        // Queries tienen alta prioridad
        if (operation.includes('query') || operation.includes('profesorPorId') || operation.includes('asignaturaPorId')) {
            return this.queues.HIGH_PRIORITY;
        }
        // Mutations tienen prioridad normal
        if (operation.includes('mutation') || operation.includes('crear') || operation.includes('actualizar')) {
            return this.queues.NORMAL_PRIORITY;
        }
        // Eliminaciones tienen baja prioridad
        return this.queues.LOW_PRIORITY;
    }

    async processGraphQLMessage(message, retryCount = 0) {
        try {
            const fetch = require('node-fetch');
            const response = await fetch(GX_BE_PROASIG_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    query: message.query,
                    variables: message.variables
                })
            });

            const result = await response.json();
            
            if (result.errors) {
                throw new Error(`GraphQL Error: ${JSON.stringify(result.errors)}`);
            }

            return {
                success: true,
                data: result.data
            };
        } catch (error) {
            if (retryCount < this.maxRetryAttempts) {
                console.log(`🔄 [RabbitMQ] Reintentando mensaje (intento ${retryCount + 1}/${this.maxRetryAttempts})`);
                await new Promise(resolve => setTimeout(resolve, 1000 * (retryCount + 1)));
                return this.processGraphQLMessage(message, retryCount + 1);
            }
            
            return {
                success: false,
                error: error.message
            };
        }
    }

    async startConsumers() {
        if (!this.channel) {
            throw new Error('Canal no inicializado');
        }

        // Consumir de todas las colas de prioridad
        for (const queue of Object.values(this.queues)) {
            if (queue === this.queues.ERROR_QUEUE) continue;

            this.channel.consume(queue, async (data) => {
                if (!data) return;

                const message = JSON.parse(data.content);
                const messageId = message.id || Math.random().toString();
                console.log(`📨 [RabbitMQ] Procesando mensaje ${messageId} desde cola ${queue}`);

                try {
                    const result = await this.processGraphQLMessage(message);
                    
                    if (result.success) {
                        // Enviar respuesta de vuelta
                        if (data.properties.replyTo) {
                            this.channel.sendToQueue(
                                data.properties.replyTo,
                                Buffer.from(JSON.stringify(result.data)),
                                {
                                    correlationId: data.properties.correlationId
                                }
                            );
                        }
                        this.channel.ack(data);
                        this.messageStatus.set(messageId, 'completed');
                    } else {
                        // Mover a cola de errores
                        this.channel.sendToQueue(
                            this.queues.ERROR_QUEUE,
                            Buffer.from(JSON.stringify({
                                ...message,
                                error: result.error,
                                originalQueue: queue
                            }))
                        );
                        this.channel.ack(data);
                        this.messageStatus.set(messageId, 'error');
                    }
                } catch (error) {
                    console.error(`❌ [RabbitMQ] Error procesando mensaje ${messageId}:`, error);
                    this.channel.nack(data);
                    this.messageStatus.set(messageId, 'failed');
                }
            });
        }

        // Manejar cola de errores
        this.channel.consume(this.queues.ERROR_QUEUE, async (data) => {
            if (!data) return;
            
            const message = JSON.parse(data.content);
            console.log('🚨 [RabbitMQ] Procesando mensaje de error:', message);
            
            // Log del error y acknowledge
            this.channel.ack(data);
        });

        console.log('🎯 [RabbitMQ] Todos los consumidores iniciados');
    }

    async sendGraphQLQuery(queryBody, variables = {}) {
        if (!this.channel) {
            throw new Error('RabbitMQ no está conectado');
        }

        console.log('🚀 [RabbitMQ] Enviando query GraphQL:', {
            query: queryBody.substring(0, 100) + '...',
            variables
        });

        return new Promise(async (resolve, reject) => {
            try {
                const messageId = Math.random().toString();
                const correlationId = Math.random().toString();
                const replyQueue = await this.channel.assertQueue('', { exclusive: true });

                // Preparar mensaje
                const message = {
                    id: messageId,
                    query: queryBody,
                    variables,
                    timestamp: new Date().toISOString()
                };

                // Determinar cola de prioridad
                const priorityQueue = this.determinePriority(queryBody);

                // Configurar timeout
                const timeout = setTimeout(() => {
                    this.channel.deleteQueue(replyQueue.queue);
                    reject(new Error('Timeout: No se recibió respuesta del servicio'));
                }, 30000); // 30 segundos

                // Esperar respuesta
                this.channel.consume(replyQueue.queue, (data) => {
                    if (data && data.properties.correlationId === correlationId) {
                        clearTimeout(timeout);
                        try {
                            const response = JSON.parse(data.content);
                            this.channel.deleteQueue(replyQueue.queue);
                            this.messageStatus.set(messageId, 'responded');
                            resolve(response);
                        } catch (error) {
                            reject(new Error('Error parsing response'));
                        }
                    }
                }, { noAck: true });

                // Enviar mensaje a la cola apropiada
                this.channel.sendToQueue(priorityQueue, Buffer.from(JSON.stringify(message)), {
                    correlationId,
                    replyTo: replyQueue.queue,
                    messageId
                });

                this.messageStatus.set(messageId, 'queued');

            } catch (error) {
                reject(error);
            }
        });
    }

    // Método para verificar el estado del servicio
    getHealthStatus() {
        return {
            status: this.channel ? 'healthy' : 'unhealthy',
            queues: Object.keys(this.queues),
            messageStatus: Object.fromEntries(this.messageStatus)
        };
    }

    async disconnect() {
        if (this.connection) {
            await this.connection.close();
            console.log('🔌 [RabbitMQ] Desconectado');
        }
    }
}

module.exports = RabbitMQService;
