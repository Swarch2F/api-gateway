const fetch = require("node-fetch");
const { MS1_URL } = require("../config/environment"); // Importamos la URL de MS1 desde environment.js
const { MS2_URL } = require('../config/environment');  // Importamos la URL de MS2 desde environment.js




// Helper para invocar cualquier query o mutation a MS1
async function invokeMS1(queryBody, variables = {}) {
  const response = await fetch(MS1_URL, {
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
async function invokeMS2(queryBody, variables = {}) {
  const response = await fetch(MS2_URL, {
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
    invokeMS1,invokeMS2
}