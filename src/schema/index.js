const { gql } = require('apollo-server-express');
const authTypes = require('./types/authTypes');

// Tipos base
const baseTypes = gql`
  type Query {
    _empty: String
  }

  type Mutation {
    _empty: String
  }
`;

// Fusionar todos los tipos
const typeDefs = [
  baseTypes,
  authTypes
];

module.exports = typeDefs; 