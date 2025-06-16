const graphqlResolvers = require('./graphql');
const restResolvers = require('./rest');

// Combinar los resolvers de GraphQL y REST
const resolvers = {
  Query: {
    ...graphqlResolvers.Query,
    ...restResolvers.Query
  },
  Mutation: {
    ...graphqlResolvers.Mutation,
    ...restResolvers.Mutation
  },
  // Resolvers de relaciones
  Curso: restResolvers.Curso,
  Estudiante: restResolvers.Estudiante
};

module.exports = resolvers; 