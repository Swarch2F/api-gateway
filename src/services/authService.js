const fetch = require('node-fetch');
const config = require('../configs/config');

class AuthService {
  constructor() {
    this.baseURL = config.GX_AUTH_URL;
    this.JWT_COOKIE_NAME = 'jwt_token';
  }

  async invokeAuthEndpoint(endpoint, method = 'GET', data = null, token = null, followRedirects = false) {
    try {
      const headers = {
        'Content-Type': 'application/json'
      };
      
      if (token) {
        headers['Authorization'] = `Bearer ${token}`;
      }

      const response = await fetch(`${this.baseURL}${endpoint}`, {
        method,
        headers,
        body: data ? JSON.stringify(data) : undefined,
        credentials: 'include',
        redirect: followRedirects ? 'follow' : 'manual'
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.error || responseData.message || 'Error en el servicio de autenticación');
      }

      return responseData;
    } catch (error) {
      throw new Error(error.message || 'Error en el servicio de autenticación');
    }
  }

  async registerUser(userData) {
    return this.invokeAuthEndpoint('/register', 'POST', userData);
  }

  async loginUser(credentials) {
    return this.invokeAuthEndpoint('/login', 'POST', credentials);
  }

  async getGoogleLoginUrl() {
    return this.invokeAuthEndpoint('/google-login', 'GET', null, null, true);
  }

  async checkAuthStatus(token = null) {
    try {
      if (!token) {
        return {
          user: {
            id: "",
            name: "Anónimo",
            email: "",
            role: "guest"
          },
          isAuthenticated: false
        };
      }

      const response = await this.invokeAuthEndpoint('/auth-status', 'GET', null, token);
      return {
        user: response.user,
        isAuthenticated: response.isAuthenticated
      };
    } catch (error) {
      return {
        user: {
          id: "",
          name: "Anónimo",
          email: "",
          role: "guest"
        },
        isAuthenticated: false
      };
    }
  }

  async logoutUser(token = null) {
    return this.invokeAuthEndpoint('/logout', 'POST', null, token);
  }
}

module.exports = new AuthService();