const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const cors = require('cors');
const { typeDefs } = require('./schema/typeDefs');
const resolvers = require('./resolvers');
const { PORT, GX_FE_URL } = require('./configs/config');

async function startServer() {
  const apolloServer = new ApolloServer({ 
    typeDefs, 
    resolvers,
    context: ({ req }) => ({
      req,
      // Extraer el token del header Authorization
      token: req.headers.authorization?.split(' ')[1]
    })
  });
  await apolloServer.start();

  const app = express();
  
  // Configurar CORS para permitir el origen específico
  app.use(cors({
    origin: GX_FE_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    exposedHeaders: ['Authorization']
  }));

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const port = process.env.NODE_ENV === 'development' ? 9000 : (process.env.PORT || PORT);
  app.listen(port, () => {
    console.log(`API Gateway corriendo exitosamente con Apollo en el puerto ${port}`);
  });
}

startServer().catch(err => {
  console.error('Error starting Apollo Server:', err);
});