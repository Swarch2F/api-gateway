const authResolvers = require('./authResolvers');
const graphqlResolvers = require('./graphql/resolvers');
const siaResolvers = require('./rest/siaResolvers');

const resolvers = {
  Query: {
    ...authResolvers.Query,
    ...graphqlResolvers.Query,
    ...siaResolvers.Query
  },
  Mutation: {
    ...authResolvers.Mutation,
    ...graphqlResolvers.Mutation,
    ...siaResolvers.Mutation
  },
  // Resolvers de relaciones
  Curso: siaResolvers.Curso,
  Estudiante: siaResolvers.Estudiante
};

module.exports = resolvers; 