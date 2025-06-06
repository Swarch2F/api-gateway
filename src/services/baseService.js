const fetch = require("node-fetch");
const { GX_BE_PROASIG_URL } = require("../config/environment"); // Importamos la URL de MS1 desde environment.js
const { GX_BE_CALIF_URL } = require('../config/environment');  // Importamos la URL de MS2 desde environment.js




// Helper para invocar cualquier query o mutation a MS1
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


// Helper para invocar cualquier query o mutation a MS2
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
    invokeBECALIF
}