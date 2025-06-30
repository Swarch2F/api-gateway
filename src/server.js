const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { typeDefs } = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { PORT, GX_FE_URL } = require('./configs/config');
const { initializeRabbitMQ, getRabbitMQStatus } = require('./services/baseService');

async function startServer() {
  const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => ({
      req,
      // Extraer el token del header Authorization
      token: req.headers.authorization?.split(' ')[1]
    })
  });
  await apolloServer.start();

  const app = express();
  
  // Configurar CORS para permitir el origen específico
  app.use(cors({
    origin: GX_FE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
  }));

  // Middleware para JSON
  app.use(express.json());

  // Endpoint de health check que incluye estado de RabbitMQ
  app.get('/health', (req, res) => {
    const rabbitStatus = getRabbitMQStatus();
    res.json({
      status: 'ok',
      timestamp: new Date().toISOString(),
      services: {
        apiGateway: 'healthy',
        rabbitmq: rabbitStatus
      }
    });
  });

  // Endpoint de prueba para verificar RabbitMQ
  app.get('/test-rabbitmq', async (req, res) => {
    try {
      const { invokeBEPROASIGAsync } = require('./services/baseService');
      const query = `query { holaMundo }`;
      
      console.log('🧪 [Test] Probando RabbitMQ...');
      const result = await invokeBEPROASIGAsync(query);
      
      res.json({
        success: true,
        message: 'RabbitMQ funcionando correctamente',
        result
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error en RabbitMQ',
        error: error.message
      });
    }
  });

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  // Inicializar RabbitMQ de forma asíncrona
  initializeRabbitMQ().catch(err => {
    console.warn('⚠️ RabbitMQ no pudo inicializarse, funcionará en modo directo:', err.message);
  });

  const port = process.env.NODE_ENV === 'development' ? 9000 : (process.env.PORT || PORT);
  app.listen(port, () => {
    console.log(`🚀 API Gateway corriendo exitosamente con Apollo en el puerto ${port}`);
    console.log(`📊 Health check disponible en: http://localhost:${port}/health`);
    console.log(`🎯 GraphQL Playground disponible en: http://localhost:${port}/graphql`);
  });
}

startServer().catch(err => {
  console.error('❌ Error starting Apollo Server:', err);
});