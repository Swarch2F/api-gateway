const { gql } = require('apollo-server-express');

const gradesTypes = gql`
  type Calificacion {
    id: ID!
    estudianteId: ID!
    asignaturaId: ID!
    cursoId: ID!
    periodo: String!
    nota: Float!
    observaciones: String
  }

  extend type Query {
    # Consultar calificaciones con filtros opcionales
    calificaciones(
      estudianteId: ID,
      asignaturaId: ID,
      cursoId: ID,
      periodo: String
    ): [Calificacion!]!
  }

  extend type Mutation {
    # Registrar nueva calificación
    registrarCalificacion(
      estudianteId: ID!,
      asignaturaId: ID!,
      cursoId: ID!,
      periodo: String!,
      nota: Float!,
      observaciones: String
    ): Calificacion

    # Actualizar calificación existente (nota y/o observaciones)
    actualizarCalificacion(
      id: ID!, 
      nota: Float, 
      observaciones: String
    ): Calificacion
    
    # Eliminar calificación
    eliminarCalificacion(id: ID!): Boolean
  }
`;

module.exports = gradesTypes;