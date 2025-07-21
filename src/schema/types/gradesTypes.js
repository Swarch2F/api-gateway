const { gql } = require('apollo-server-express');

const gradesTypes = gql`
  # =============== TIPOS DE CALIFICACIONES (Component-2-2) ===============
  
  type Calificacion {
    id: ID!
    estudianteId: ID!
    asignaturaId: ID!
    cursoId: ID!
    periodo: String!
    nota: Float!
    observaciones: String
    
    # =============== RELACIONES CON OTROS MICROSERVICIOS ===============
    # Datos del estudiante (viene de Component-1: SIA)
    estudiante: Estudiante
    
    # Datos de la asignatura (viene de Component-2-1: Asignaturas)
    asignatura: Asignatura
    
    # Datos del curso (viene de Component-1: SIA)
    curso: Curso
  }

  # Input para crear/actualizar calificaciones
  input CalificacionInput {
    estudianteId: ID!
    asignaturaId: ID!
    cursoId: ID!
    periodo: String!
    nota: Float!
    observaciones: String
  }

  # Tipo de respuesta para operaciones de calificaciones
  type CalificacionResponse {
    success: Boolean!
    message: String
    calificacion: Calificacion
    errors: [String!]
  }

  extend type Query {
    # =============== QUERIES DE CALIFICACIONES ===============
    # Consultar calificaciones con filtros opcionales
    calificaciones(
      estudianteId: ID,
      asignaturaId: ID,
      cursoId: ID,
      periodo: String
    ): [Calificacion!]!
    
    # Obtener calificación por ID
    calificacion(id: ID!): Calificacion
  }

  extend type Mutation {
    # =============== MUTATIONS DE CALIFICACIONES ===============
    # Registrar nueva calificación
    registrarCalificacion(input: CalificacionInput!): CalificacionResponse!
    
    # Actualizar calificación existente
    actualizarCalificacion(
      id: ID!, 
      nota: Float, 
      observaciones: String
    ): CalificacionResponse!
    
    # Eliminar calificación
    eliminarCalificacion(id: ID!): CalificacionResponse!
  }
`;

module.exports = gradesTypes;