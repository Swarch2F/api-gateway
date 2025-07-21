const professorResolver = require('./professorResolver');
const subjectResolver = require('./subjectResolver');
const gradeResolver = require('./gradeResolver');
const adminResolver = require('./adminResolver');
const authResolver = require('../rest/authResolvers');

const graphqlResolvers = {
  Query: {
    ...professorResolver.Query,
    ...subjectResolver.Query,
    ...gradeResolver.Query,
    ...adminResolver.Query,
    ...authResolver.Query
  },
  Mutation: {
    ...professorResolver.Mutation,
    ...subjectResolver.Mutation,
    ...gradeResolver.Mutation,
    ...authResolver.Mutation
  },
  Profesor: {
    ...professorResolver.Profesor
  }
};

module.exports = graphqlResolvers; 