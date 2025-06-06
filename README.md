# API Gateway - Arquitectura y Componentes

## Arquitectura General
El API Gateway está construido como un punto de entrada unificado que interactúa con dos microservicios principales usando GraphQL.

## Componentes Principales

### 1. Microservicios Integrados
- **MS1 (Puerto 8080)**: Gestiona Profesores y Asignaturas
  - Profesores (CRUD)
  - Asignaturas (CRUD)
  - Asignación profesor-asignatura

- **MS2 (Puerto 8081)**: Gestiona Calificaciones
  - Calificaciones (CRUD)
  - Consultas filtradas
  - Histórico académico

### 2. Servicios del Gateway
- **professorService**: Comunicación con MS1 para profesores
- **subjectService**: Comunicación con MS1 para asignaturas
- **gradesService**: Comunicación con MS2 para calificaciones
- **baseService**: Maneja la comunicación base con los microservicios

### 3. Schema GraphQL
- **Types**:
  - `professorTypes.js`: Define tipos para profesores
  - `subjectTypes.js`: Define tipos para asignaturas
  - `gradesTypes.js`: Define tipos para calificaciones
- **Resolvers**: Implementa la lógica de resolución
- **TypeDefs**: Combina todos los tipos GraphQL

### 4. Configuración
- Puerto del gateway: 9000
- URLs de microservicios configurables
- Manejo de entornos mediante variables

## Flujo de Datos
1. Cliente hace petición GraphQL al Gateway (puerto 9000)
2. Gateway resuelve la petición usando los servicios apropiados
3. Los servicios se comunican con MS1 o MS2 según corresponda
4. La respuesta se devuelve al cliente en formato GraphQL

## Tecnologías
- Node.js
- Express
- Apollo Server
- GraphQL
- Docker

## Diagrama Básico
```
Cliente → API Gateway (9000) → MS1 (8080) - Profesores/Asignaturas
                             → MS2 (8081) - Calificaciones
```

## Endpoints GraphQL docker
- Gateway: `http://localhost:9000/graphql`
- MS1: `http://localhost:8080/graphql`
- MS2: `http://localhost:8081/graphql`