#!/bin/bash

echo "🚀 Iniciando todos los microservicios con RabbitMQ integrado..."
echo ""

# Verificar que Docker esté corriendo
if ! docker info > /dev/null 2>&1; then
    echo "❌ Error: Docker no está corriendo. Por favor inicia Docker Desktop."
    exit 1
fi

echo "📦 Construyendo e iniciando todos los contenedores..."
docker-compose up --build -d

echo ""
echo "⏳ Esperando que los servicios estén listos..."
sleep 15

echo ""
echo "🔍 Verificando estado de RabbitMQ..."
curl -s http://localhost:9000/health | jq '.services.rabbitmq' || echo "Health check no disponible aún"

echo ""
echo "✅ Servicios desplegados correctamente con RabbitMQ!"
echo ""
echo "🌐 ENDPOINTS DISPONIBLES:"
echo "=================================="
echo "🏠 API Gateway:           http://localhost:9000/graphql"
echo "🔐 Autenticación:        http://localhost:8082/api/v1"
echo "📚 Swagger Auth:         http://localhost:8082/swagger"
echo "👨‍🏫 Profesores/Asignaturas: http://localhost:8080/graphql"
echo "📊 Calificaciones:       http://localhost:8081/graphql"
echo ""
echo "💾 BASES DE DATOS:"
echo "=================================="
echo "🐘 PostgreSQL (Auth):    localhost:5432"
echo "🍃 MongoDB (Profesores): localhost:27018"
echo "🍃 MongoDB (Calificaciones): localhost:27019"
echo ""
echo "📋 USUARIO DE PRUEBA:"
echo "=================================="
echo "Email: test@example.com"
echo "Password: password123"
echo ""
echo "🎯 EJEMPLO DE LOGIN:"
echo "=================================="
echo 'mutation {'
echo '  loginUser(input: {'
echo '    email: "test@example.com"'
echo '    password: "password123"'
echo '  }) {'
echo '    token'
echo '    message'
echo '  }'
echo '}'
echo ""
echo "📝 Para ver logs en tiempo real:"
echo "docker-compose logs -f"
echo ""
echo "🛑 Para detener todos los servicios:"
echo "docker-compose down" 