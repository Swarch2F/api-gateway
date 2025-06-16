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

module.exports = {
  invokeBEPROASIG,
  invokeBECALIF,
};
