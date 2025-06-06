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
    calificaciones(
      estudianteId: ID,
      asignaturaId: ID,
      cursoId: ID,
      periodo: String
    ): [Calificacion!]!
  }

  extend type Mutation {
    registrarCalificacion(
      estudianteId: ID!,
      asignaturaId: ID!,
      cursoId: ID!,
      periodo: String!,
      nota: Float!,
      observaciones: String
    ): Calificacion

    actualizarCalificacion(id: ID!, nota: Float!): Calificacion
    eliminarCalificacion(id: ID!): Boolean
  }
`;

module.exports = gradesTypes;