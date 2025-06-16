const professorResolver = require('./professorResolver');
const subjectResolver = require('./subjectResolver');
const gradeResolver = require('./gradeResolver');

const graphqlResolvers = {
  Query: {
    ...professorResolver.Query,
    ...subjectResolver.Query,
    ...gradeResolver.Query
  },
  Mutation: {
    ...professorResolver.Mutation,
    ...subjectResolver.Mutation,
    ...gradeResolver.Mutation
  }
};

module.exports = graphqlResolvers; 