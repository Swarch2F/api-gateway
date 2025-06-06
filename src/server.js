const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { typeDefs } = require('./schema/typeDefs');
const resolvers = require('./schema/resolvers');
const { PORT } = require('./config/environment');

async function startServer() {
  const apolloServer = new ApolloServer({ typeDefs, resolvers });
  await apolloServer.start();

  const app = express();
  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`API Gateway corriendo`);
  });
}

startServer().catch(err => {
  console.error('Error starting Apollo Server:', err);
});