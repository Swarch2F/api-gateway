const { gql } = require('apollo-server-express');

const professorTypes = gql`
  type Profesor {
    id: ID!
    nombre: String!
    documento: String!
    area: String!
  }

  extend type Query {
    profesores: [Profesor!]!
    profesorPorId(id: ID!): Profesor
  }

  extend type Mutation {
    crearProfesor(nombre: String!, documento: String!, area: String!): Profesor
    actualizarProfesor(id: ID!, nombre: String, area: String): Profesor
    eliminarProfesor(id: ID!): Boolean
  }
`;

module.exports = professorTypes;