const { invokeAuthService } = require('./baseService');

// —————— OPERACIONES DE AUTENTICACIÓN ——————

/**
 * Registra un nuevo usuario con email y contraseña
 * @param {Object} userData - { email: string, password: string, name: string, role: string }
 * @returns {Promise<Object>} Resultado del registro
 */
async function registerUser(userData) {
  console.log('🔑 [authService] Iniciando registro para:', userData.email);
  try {
    const response = await invokeAuthService('/register', 'POST', userData);
    console.log('📦 [authService] Respuesta del registro:', response);
    return {
      message: 'Usuario registrado exitosamente',
      user: response.data
    };
  } catch (error) {
    console.error('❌ [authService] Error en registro:', error);
    throw error;
  }
}

/**
 * Inicia sesión con email y contraseña
 * @param {string} email - Email del usuario
 * @param {string} password - Contraseña del usuario
 * @returns {Promise<{data: Object, headers: Object}>} Resultado del login y headers
 */
async function loginUser(credentials) {
  console.log('🔑 [authService] Iniciando login para:', credentials.email);
  try {
    const response = await invokeAuthService('/login', 'POST', {
      email: credentials.email,
      password: credentials.password
    });
    console.log('📦 [authService] Respuesta del servicio de autenticación:', response);
    
    // Verificar que tenemos una respuesta válida
    if (!response || !response.headers) {
      throw new Error('Respuesta inválida del servicio de autenticación');
    }

    const token = response.headers.get('authorization');
    if (!token) {
      throw new Error('No se recibió el token de autenticación');
    }

    return {
      message: 'Inicio de sesión exitoso',
      token: token.replace('Bearer ', '')
    };
  } catch (error) {
    console.error('❌ [authService] Error en login:', error);
    throw new Error(error.message || 'Error en el inicio de sesión');
  }
}

/**
 * Obtiene la URL de redirección para login con Google
 * @returns {Promise<Object>} URL de redirección a Google OAuth
 */
async function getGoogleLoginUrl() {
  const response = await invokeAuthService('/auth/google/login', 'GET');
  return {
    googleUrl: 'http://localhost:8082/api/v1/auth/google/login',
    message: 'URL de login con Google obtenida exitosamente'
  };
}

/**
 * Vincula una cuenta de Google a una cuenta existente
 * @param {Object} linkData - { email: string, password: string, googleAuthCode: string }
 * @returns {Promise<Object>} Resultado de la vinculación
 */
async function linkGoogleAccount({ email, password, googleAuthCode }) {
  return await invokeAuthService('/auth/google/link', 'POST', {
    email,
    password,
    google_auth_code: googleAuthCode
  });
}

/**
 * Obtiene el estado de autenticación del usuario
 * @param {string} authHeader - Header de autorización (Bearer token)
 * @returns {Promise<Object>} Estado de autenticación
 */
async function getAuthStatus(authHeader) {
  console.log('🔑 [authService] Verificando estado de autenticación');
  try {
    const response = await invokeAuthService('/auth-status', 'GET', null, {
      'Authorization': authHeader
    });
    console.log('📦 [authService] Respuesta del estado de autenticación:', response);
    return response.data;
  } catch (error) {
    console.error('❌ [authService] Error al verificar estado:', error);
    return {
      user: { id: '', name: 'Anónimo', email: '', role: 'guest' },
      isAuthenticated: false
    };
  }
}

/**
 * Cierra la sesión del usuario
 * @returns {Promise<Object>} Resultado del logout
 */
async function logout() {
  return await invokeAuthService('/logout', 'POST');
}

async function handleGoogleCallback(code) {
  console.log('🔑 [authService] Procesando callback de Google');
  try {
    const response = await invokeAuthService(`/auth/google/callback?code=${code}`, 'GET');
    console.log('📦 [authService] Respuesta del callback de Google:', response);
    
    // Verificar que tenemos una respuesta válida
    if (!response || !response.headers) {
      throw new Error('Respuesta inválida del servicio de autenticación');
    }

    const token = response.headers.get('authorization');
    if (!token) {
      throw new Error('No se recibió el token de autenticación');
    }

    return {
      message: 'Inicio de sesión exitoso con Google',
      token: token.replace('Bearer ', '')
    };
  } catch (error) {
    console.error('❌ [authService] Error en callback de Google:', error);
    throw new Error(error.message || 'Error en el inicio de sesión con Google');
  }
}

/**
 * Verifica si un correo ya existe en el microservicio de autenticación
 * @param {string} email
 * @returns {Promise<boolean>}
 */
async function emailExists(email) {
  const response = await invokeAuthService(`/users/exists?email=${encodeURIComponent(email)}`, 'GET');
  if (!response || !response.data) return false;
  return !!response.data.exists;
}

module.exports = {
  registerUser,
  loginUser,
  getGoogleLoginUrl,
  linkGoogleAccount,
  getAuthStatus,
  logout,
  handleGoogleCallback,
  emailExists
};