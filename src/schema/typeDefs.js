const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Query {
    hello1: String!
    hello2: String!
  }
`;

module.exports = typeDefs;