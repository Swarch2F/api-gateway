
const siaResolvers = require('./siaResolvers');

const restResolvers = {
  Query: {
    ...siaResolvers.Query
  },
  Mutation: {
    ...siaResolvers.Mutation
  },
  // Resolvers de relaciones
  Curso: siaResolvers.Curso,
  Estudiante: siaResolvers.Estudiante
};

module.exports = restResolvers;
// This module aggregates all REST resolvers for the API Gateway.