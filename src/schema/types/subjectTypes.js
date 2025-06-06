const { gql } = require('apollo-server-express');

const subjectTypes = gql`
  type Asignatura {
    id: ID!
    nombre: String!
    profesorIds: [ID!]!
  }

  extend type Query {
    asignaturas: [Asignatura!]!
    asignaturaPorId(id: ID!): Asignatura
  }

  extend type Mutation {
    crearAsignatura(nombre: String!): Asignatura
    asignarProfesorAAsignatura(profesorId: ID!, asignaturaId: ID!): Asignatura
  }
`;

module.exports = subjectTypes;