const { AuthenticationError } = require('apollo-server-express');
const authService = require('../../services/authService');

// Función helper para extraer el token del header de autorización
function getTokenFromHeaders(req) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return null;
  
  const [bearer, token] = authHeader.split(' ');
  if (bearer !== 'Bearer' || !token) return null;
  
  return token;
}

const authResolvers = {
  Query: {
    // Obtener estado de autenticación
    authStatus: async (_, __, { req }) => {
      try {
        const token = getTokenFromHeaders(req);
        return await authService.getAuthStatus(token);
      } catch (error) {
        console.error('Error en authStatus:', error);
        throw new AuthenticationError(error.message);
      }
    }
  },

  Mutation: {
    // Registrar usuario
    registerUser: async (_, { input }) => {
      try {
        const result = await authService.registerUser(input);
        return {
          message: result.message,
          error: result.error
        };
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },

    // Verificar si un email existe
    emailExists: async (_, { email }) => {
      try {
        return await authService.emailExists(email);
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },

    // Login de usuario
    loginUser: async (_, { input }) => {
      try {
        const result = await authService.loginUser(input);
        return {
          message: result.message,
          token: result.token
        };
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    },

    // Cerrar sesión
    logout: async (_, __, { req }) => {
      try {
        const token = getTokenFromHeaders(req);
        const result = await authService.logoutUser(token);
        return {
          message: result.message
        };
      } catch (error) {
        throw new AuthenticationError(error.message);
      }
    }
  }
};

module.exports = authResolvers; 