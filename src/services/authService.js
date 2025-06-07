const fetch = require("node-fetch");
const { GX_AUTH_URL } = require("../configs/config");

/**
 * Helper para invocar endpoints REST del microservicio de autenticación
 * @param {string} endpoint - El endpoint REST a invocar
 * @param {string} method - Método HTTP (GET, POST, etc.)
 * @param {Object} body - Cuerpo de la petición (para POST/PUT)
 * @param {Object} headers - Headers adicionales
 * @returns {Promise<Object>} El resultado de la petición REST
 */
async function invokeAuthService(endpoint, method = 'GET', body = null, headers = {}) {
  const url = `${GX_AUTH_URL}${endpoint}`;
  const options = {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    }
  };

  if (body && (method === 'POST' || method === 'PUT')) {
    options.body = JSON.stringify(body);
  }

  try {
    const response = await fetch(url, options);
    const data = await response.json();
    
    if (!response.ok) {
      throw new Error(`Auth Service Error (${response.status}): ${data.error || data.message || 'Unknown error'}`);
    }
    
    return data;
  } catch (error) {
    throw new Error(`Auth Service Connection Error: ${error.message}`);
  }
}

// —————— OPERACIONES DE AUTENTICACIÓN ——————

/**
 * Registra un nuevo usuario con email y contraseña
 * @param {Object} userData - { email: string, password: string }
 * @returns {Promise<Object>} Resultado del registro
 */
async function registerUser({ email, password }) {
  return await invokeAuthService('/register', 'POST', { email, password });
}

/**
 * Inicia sesión con email y contraseña
 * @param {Object} loginData - { email: string, password: string }
 * @returns {Promise<Object>} Resultado del login con token
 */
async function loginUser({ email, password }) {
  return await invokeAuthService('/login', 'POST', { email, password });
}

/**
 * Obtiene la URL de redirección para login con Google
 * @returns {Promise<Object>} URL de redirección a Google OAuth
 */
async function getGoogleLoginUrl() {
  // Para Google OAuth, necesitamos devolver la URL del servicio
  return {
    googleUrl: `${GX_AUTH_URL}/auth/google/login`,
    message: "Redirige al usuario a esta URL para autenticación con Google"
  };
}

/**
 * Vincula una cuenta de Google a una cuenta existente
 * @param {Object} linkData - { email: string, password: string, google_auth_code: string }
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
 * Obtiene el perfil del usuario autenticado
 * @param {string} token - Token JWT del usuario
 * @returns {Promise<Object>} Perfil del usuario
 */
async function getUserProfile(token) {
  return await invokeAuthService('/profile', 'GET', null, {
    'Authorization': `Bearer ${token}`
  });
}

/**
 * Valida un token JWT
 * @param {string} token - Token JWT a validar
 * @returns {Promise<Object>} Información del token validado
 */
async function validateToken(token) {
  try {
    const profile = await getUserProfile(token);
    return { valid: true, user: profile };
  } catch (error) {
    return { valid: false, error: error.message };
  }
}

module.exports = {
  registerUser,
  loginUser,
  getGoogleLoginUrl,
  linkGoogleAccount,
  getUserProfile,
  validateToken
}; 