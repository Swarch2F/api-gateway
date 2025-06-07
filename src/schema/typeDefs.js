const { gql } = require('apollo-server-express');
const professorTypes = require('./types/professorTypes');
const subjectTypes = require('./types/subjectTypes');
const gradesTypes = require('./types/gradesTypes');
const authTypes = require('./types/authTypes');
const siaTypes = require('./types/siaTypes');

// Definición base de tipos
const baseTypes = gql`
  type Query {
    holaMundo1: String!
    holaMundo2: String!
  }

  type Mutation {
    _empty: String
  }
`;

// Combinamos todos los types en un array
const typeDefs = [baseTypes, professorTypes, subjectTypes, gradesTypes, authTypes, siaTypes];

module.exports = { typeDefs };


