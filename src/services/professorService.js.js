// ms1.js
const fetch = require('node-fetch');
const { MS1_URL } = require('../config/environment');  // Importamos la URL de MS1 desde environment.js

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

// —————— OPERACIÓN “holaMundo” ——————

/**
 * Invoca MS1 → { holaMundo }
 */
async function getHolaMundoFromMS1() {
  const query = `query { holaMundo }`;
  const data = await invokeMS1(query);
  return data.holaMundo;
}

// —————— QUERIES de Profesores y Asignaturas ——————

/**
 * Invoca MS1 → { profesores { id nombre documento area } }
 */
async function getProfesores() {
  const query = `
    query {
      profesores {
        id
        nombre
        documento
        area
      }
    }
  `;
  const data = await invokeMS1(query);
  return data.profesores; // [ { id, nombre, documento, area }, ... ]
}

/**
 * Invoca MS1 → { profesorPorId(id: $id) { id nombre documento area } }
 * @param {string} id
 */
async function getProfesorPorId(id) {
  const query = `
    query ($id: ID!) {
      profesorPorId(id: $id) {
        id
        nombre
        documento
        area
      }
    }
  `;
  const data = await invokeMS1(query, { id });
  return data.profesorPorId; // { id, nombre, documento, area } o null
}

/**
 * Invoca MS1 → { asignaturas { id nombre profesorIds } }
 */
async function getAsignaturas() {
  const query = `
    query {
      asignaturas {
        id
        nombre
        profesorIds
      }
    }
  `;
  const data = await invokeMS1(query);
  return data.asignaturas; // [ { id, nombre, profesorIds }, ... ]
}

/**
 * Invoca MS1 → { asignaturaPorId(id: $id) { id nombre profesorIds } }
 * @param {string} id
 */
async function getAsignaturaPorId(id) {
  const query = `
    query ($id: ID!) {
      asignaturaPorId(id: $id) {
        id
        nombre
        profesorIds
      }
    }
  `;
  const data = await invokeMS1(query, { id });
  return data.asignaturaPorId; // { id, nombre, profesorIds } o null
}

// —————— MUTATIONS de Profesor y Asignatura ——————

/**
 * Invoca MS1 → mutation { crearProfesor(nombre:$nombre, documento:$documento, area:$area) { id nombre area } }
 * @param {object} input  – { nombre: string, documento: string, area: string }
 */
async function crearProfesor({ nombre, documento, area }) {
  const mutation = `
    mutation ($nombre: String!, $documento: String!, $area: String!) {
      crearProfesor(nombre: $nombre, documento: $documento, area: $area) {
        id
        nombre
        area
      }
    }
  `;
  const data = await invokeMS1(mutation, { nombre, documento, area });
  return data.crearProfesor; // { id, nombre, area }
}

/**
 * Invoca MS1 → mutation { actualizarProfesor(id:$id, nombre:$nombre, area:$area) { id nombre area documento } }
 * @param {object} input – { id: string, nombre?: string, area?: string }
 */
async function actualizarProfesor({ id, nombre, area }) {
  const mutation = `
    mutation ($id: ID!, $nombre: String, $area: String) {
      actualizarProfesor(id: $id, nombre: $nombre, area: $area) {
        id
        nombre
        area
        documento
      }
    }
  `;
  const variables = { id, nombre, area };
  const data = await invokeMS1(mutation, variables);
  return data.actualizarProfesor; // { id, nombre, area, documento }
}

/**
 * Invoca MS1 → mutation { eliminarProfesor(id:$id) }
 * @param {object} input – { id: string }
 */
async function eliminarProfesor({ id }) {
  const mutation = `
    mutation ($id: ID!) {
      eliminarProfesor(id: $id)
    }
  `;
  const data = await invokeMS1(mutation, { id });
  return data.eliminarProfesor; // true o false
}

/**
 * Invoca MS1 → mutation { crearAsignatura(nombre:$nombre) { id nombre profesorIds } }
 * @param {object} input – { nombre: string }
 */
async function crearAsignatura({ nombre }) {
  const mutation = `
    mutation ($nombre: String!) {
      crearAsignatura(nombre: $nombre) {
        id
        nombre
        profesorIds
      }
    }
  `;
  const data = await invokeMS1(mutation, { nombre });
  return data.crearAsignatura; // { id, nombre, profesorIds }
}

/**
 * Invoca MS1 → mutation { asignarProfesorAAsignatura(profesorId:$profesorId, asignaturaId:$asignaturaId) { id nombre profesorIds } }
 * @param {object} input – { profesorId: string, asignaturaId: string }
 */
async function asignarProfesorAAsignatura({ profesorId, asignaturaId }) {
  const mutation = `
    mutation ($profesorId: ID!, $asignaturaId: ID!) {
      asignarProfesorAAsignatura(profesorId: $profesorId, asignaturaId: $asignaturaId) {
        id
        nombre
        profesorIds
      }
    }
  `;
  const data = await invokeMS1(mutation, { profesorId, asignaturaId });
  return data.asignarProfesorAAsignatura; // { id, nombre, profesorIds }
}

module.exports = {
  getHolaMundoFromMS1,
  getProfesores,
  getProfesorPorId,
  getAsignaturas,
  getAsignaturaPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,
  crearAsignatura,
  asignarProfesorAAsignatura
};
