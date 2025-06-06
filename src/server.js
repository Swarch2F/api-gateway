const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { typeDefs } = require('./schema/typeDefs');
const resolvers = require('./resolvers/graphql/resolvers');
const { PORT } = require('./configs/config');

async function startServer() {
  const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => ({
      req
    })
  });
  await apolloServer.start();

  const app = express();
  
  // Configurar CORS para permitir cualquier origen
  app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'OPTIONS'],
    allowedHeaders: '*'
  }));

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  app.listen(PORT, () => {
    console.log(`API Gateway corriendo exitosamente con Apollo`);
  });
}

startServer().catch(err => {
  console.error('Error starting Apollo Server:', err);
});