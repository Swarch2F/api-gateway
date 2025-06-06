// ms2.js
const fetch = require('node-fetch');
const { MS2_URL } = require('../config/environment');  // Importamos la URL de MS2 desde environment.js

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

// —————— OPERACIÓN “holaMundo” ——————

/**
 * Invoca MS2 → { holaMundo }
 */
async function getHolaMundoFromMS2() {
  const query = `query { holaMundo }`;
  const data = await invokeMS2(query);
  return data.holaMundo;
}

// —————— QUERIES de Calificaciones ——————

/**
 * Invoca MS2 → { calificaciones(estudianteId:$estudianteId, asignaturaId:$asignaturaId, cursoId:$cursoId, periodo:$periodo) { id estudianteId asignaturaId cursoId periodo nota observaciones } }
 * @param {object} filters – { estudianteId?: string, asignaturaId?: string, cursoId?: string, periodo?: string }
 */
async function getCalificaciones({ estudianteId, asignaturaId, cursoId, periodo }) {
  const query = `
    query ($estudianteId: ID, $asignaturaId: ID, $cursoId: ID, $periodo: String) {
      calificaciones(
        estudianteId: $estudianteId,
        asignaturaId: $asignaturaId,
        cursoId: $cursoId,
        periodo: $periodo
      ) {
        id
        estudianteId
        asignaturaId
        cursoId
        periodo
        nota
        observaciones
      }
    }
  `;
  const variables = { estudianteId, asignaturaId, cursoId, periodo };
  const data = await invokeMS2(query, variables);
  return data.calificaciones;
}

// —————— MUTATIONS de Calificación ——————

/**
 * Invoca MS2 → mutation { registrarCalificacion(estudianteId:$estudianteId, asignaturaId:$asignaturaId, cursoId:$cursoId, periodo:$periodo, nota:$nota, observaciones:$observaciones) { id estudianteId asignaturaId nota observaciones } }
 * @param {object} input – { estudianteId: string, asignaturaId: string, cursoId: string, periodo: string, nota: number, observaciones: string }
 */
async function registrarCalificacion({ estudianteId, asignaturaId, cursoId, periodo, nota, observaciones }) {
  const mutation = `
    mutation (
      $estudianteId: ID!,
      $asignaturaId: ID!,
      $cursoId: ID!,
      $periodo: String!,
      $nota: Float!,
      $observaciones: String
    ) {
      registrarCalificacion(
        estudianteId: $estudianteId,
        asignaturaId: $asignaturaId,
        cursoId: $cursoId,
        periodo: $periodo,
        nota: $nota,
        observaciones: $observaciones
      ) {
        id
        estudianteId
        asignaturaId
        nota
        observaciones
      }
    }
  `;
  const variables = { estudianteId, asignaturaId, cursoId, periodo, nota, observaciones };
  const data = await invokeMS2(mutation, variables);
  return data.registrarCalificacion;
}

/**
 * Invoca MS2 → mutation { actualizarCalificacion(id:$id, nota:$nota) { id nota observaciones } }
 * @param {object} input – { id: string, nota: number }
 */
async function actualizarCalificacion({ id, nota }) {
  const mutation = `
    mutation ($id: ID!, $nota: Float!) {
      actualizarCalificacion(id: $id, nota: $nota) {
        id
        nota
        observaciones
      }
    }
  `;
  const data = await invokeMS2(mutation, { id, nota });
  return data.actualizarCalificacion;
}

/**
 * Invoca MS2 → mutation { eliminarCalificacion(id:$id) }
 * @param {object} input – { id: string }
 */
async function eliminarCalificacion({ id }) {
  const mutation = `
    mutation ($id: ID!) {
      eliminarCalificacion(id: $id)
    }
  `;
  const data = await invokeMS2(mutation, { id });
  return data.eliminarCalificacion; // true o false
}

module.exports = {
  getHolaMundoFromMS2,
  getCalificaciones,
  registrarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion
};
