const { gql } = require('apollo-server-express');
const professorTypes = require('./types/professorTypes');
const subjectTypes = require('./types/subjectTypes');
const gradesTypes = require('./types/gradesTypes');
const authTypes = require('./types/authTypes');
const siaTypes = require('./types/siaTypes');

const baseTypes = gql`
  type Query {
    _empty: String
  }
  type Mutation {
    _empty: String
  }
`;

const typeDefs = [
  baseTypes,
  professorTypes,
  subjectTypes,
  gradesTypes,
  authTypes,
  siaTypes
];

module.exports = typeDefs; 