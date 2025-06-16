const fetch = require("node-fetch");
const { GX_BE_PROASIG_URL, GX_BE_CALIF_URL, GX_AUTH_URL } = require("../configs/config");
// const axios = require("axios");


/**
 * Helper para invocar cualquier query o mutation a MS1
 * @param {string} queryBody - El cuerpo de la consulta GraphQL a enviar a MS1
 * @param {Object} variables - Los variables a pasarle a la consulta GraphQL
 * @returns {Promise<Object>} El resultado de la consulta GraphQL en formato JSON
 */
async function invokeBEPROASIG(queryBody, variables = {}) {
  const response = await fetch(GX_BE_PROASIG_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: queryBody,
      variables
    })
  });
  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(`MS1 Error: ${JSON.stringify(errors)}`);
  }
  return data;
}

/**
 * Helper para invocar cualquier query o mutation a MS2
 * @param {string} queryBody - El cuerpo de la consulta GraphQL a enviar a MS2
 * @param {Object} variables - Los variables a pasarle a la consulta GraphQL
 * @returns {Promise<Object>} El resultado de la consulta GraphQL en formato JSON
 */
async function invokeBECALIF(queryBody, variables = {}) {
  const response = await fetch(GX_BE_CALIF_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      query: queryBody,
      variables
    })
  });
  const { data, errors } = await response.json();
  if (errors) {
    throw new Error(`MS2 Error: ${JSON.stringify(errors)}`);
  }
  return data;
}

const AUTH_SERVICE_URL = GX_AUTH_URL;

/**
 * Invoca al servicio de autenticación
 * @param {string} endpoint - Endpoint a invocar
 * @param {string} method - Método HTTP (GET, POST, etc)
 * @param {Object} data - Datos a enviar (opcional)
 * @param {Object} headers - Headers adicionales (opcional)
 * @param {boolean} includeAuth - Si se debe incluir el header de autorización
 * @returns {Promise<Object>} Respuesta del servicio
 */
async function invokeAuthService(endpoint, method = 'GET', data = null, headers = {}) {
    const url = `${GX_AUTH_URL}${endpoint}`;
    console.log('🚀 [baseService] Invocando servicio de autenticación:', {
        url,
        method,
        data,
        headers
    });

    try {
        const response = await fetch(url, {
            method,
            headers: {
                ...headers,
                'Content-Type': 'application/json'
            },
            body: data ? JSON.stringify(data) : undefined
        });

        // Leer el cuerpo de la respuesta
        const responseData = await response.json().catch(() => null);

        if (!response.ok) {
            throw {
                response: {
                    status: response.status,
                    data: responseData
                }
            };
        }

        console.log('📦 [baseService] Respuesta del servicio:', response);
        
        // Devolver un objeto que simule la estructura de axios
        return {
            data: responseData,
            headers: response.headers,
            status: response.status
        };

    } catch (error) {
        console.error('❌ [baseService] Error:', error);
        if (error.response) {
            const { status, data } = error.response;
            switch (status) {
                case 400:
                    throw new Error(data?.message || 'Solicitud inválida');
                case 401:
                    throw new Error(data?.message || 'No autorizado');
                case 403:
                    throw new Error(data?.message || 'Acceso denegado');
                case 409:
                    throw new Error(data?.message || 'Conflicto: El recurso ya existe');
                case 500:
                    throw new Error(data?.message || 'Error interno del servidor');
                default:
                    throw new Error(data?.message || 'Error en la solicitud');
            }
        }
        throw error;
    }
}

module.exports = {
  invokeBEPROASIG,
  invokeBECALIF,
  invokeAuthService
};
