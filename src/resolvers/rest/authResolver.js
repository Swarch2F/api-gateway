const { 
    registerUser, 
    loginUser, 
    getGoogleLoginUrl, 
    linkGoogleAccount,
    getAuthStatus,
    logout,
    handleGoogleCallback
  } = require('../../services/authService');
  
  const authResolver = {
    Query: {
      getGoogleLoginUrl: async () => {
        console.log('🔗 Obteniendo URL de login con Google');
        return {
          googleUrl: 'http://localhost:8082/api/v1/auth/google/login',
          message: 'URL de login con Google obtenida exitosamente'
        };
      },
      authStatus: async (_, __, { req }) => {
        console.log('🔍 Consultando estado de autenticación');
        const authHeader = req.headers.authorization;
        console.log('🔑 Header de autorización:', authHeader);
        return await getAuthStatus(authHeader);
      }
    },
    Mutation: {
      registerUser: async (_, { input }) => {
        console.log('📝 Intento de registro:', input.email);
        const result = await registerUser(input);
        return {
          message: result.message || 'Usuario registrado exitosamente'
        };
      },
      loginUser: async (_, { input }, { req }) => {
        console.log('🔑 Intento de login:', input.email);
        const result = await loginUser(input);
        if (!result || !result.token) {
          throw new Error('No se recibió el token de autenticación');
        }
        return {
          message: result.message || 'Login exitoso',
          token: result.token
        };
      },
      linkGoogleAccount: async (_, { input }) => linkGoogleAccount(input),
      logout: async (_, __, context) => {
        try {
          await logout(context.req?.headers?.authorization);
          return { message: 'Sesión cerrada exitosamente' };
        } catch (error) {
          console.error('❌ [resolver] Error en logout:', error);
          throw new Error(error.message || 'Error al cerrar sesión');
        }
      },
      handleGoogleCallback: async (_, { input }) => {
        console.log('🔄 Procesando callback de Google');
        const result = await handleGoogleCallback(input.code);
        if (!result || !result.token) {
          throw new Error('No se recibió el token de autenticación');
        }
        return {
          message: result.message || 'Autenticación con Google exitosa',
          token: result.token
        };
      }
    }
  };
  
  module.exports = authResolver; 