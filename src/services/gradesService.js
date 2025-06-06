const { invokeBECALIF } = require('./baseService');

// —————— OPERACIÓN “holaMundo” ——————

/**
 * Invoca BECALIF → { holaMundo }
 * @returns {Promise<string>} El string "holaMundo" desde el servicio BECALIF
 */
async function getHolaMundoFromBECALIF() {
  const query = `query { holaMundo }`;
  const data = await invokeBECALIF(query);
  return data.holaMundo;
}

// —————— QUERIES de Calificaciones ——————

/**
 * Invoca BECALIF → { calificaciones(estudianteId:$estudianteId, asignaturaId:$asignaturaId, cursoId:$cursoId, periodo:$periodo) { id estudianteId asignaturaId cursoId periodo nota observaciones } }
 * @param {object} filters – { estudianteId?: string, asignaturaId?: string, cursoId?: string, periodo?: string }
 * @returns {Promise<Calificacion[]>} Un array de objetos Calificación { id, estudianteId, asignaturaId, cursoId, periodo, nota, observaciones } que coinciden con los filtros
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
  const data = await invokeBECALIF(query, variables);
  return data.calificaciones;
}

// —————— MUTATIONS de Calificación ——————

/**
 * Invoca BECALIF → mutation { registrarCalificacion(estudianteId:$estudianteId, asignaturaId:$asignaturaId, cursoId:$cursoId, periodo:$periodo, nota:$nota, observaciones:$observaciones) { id estudianteId asignaturaId nota observaciones } }
 * @param {object} input – { estudianteId: string, asignaturaId: string, cursoId: string, periodo: string, nota: number, observaciones: string }
 * @returns {Promise<Calificacion>} El objeto Calificación { id, estudianteId, asignaturaId, nota, observaciones } recién creado
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
  const data = await invokeBECALIF(mutation, variables);
  return data.registrarCalificacion;
}

/**
 * Invoca BECALIF → mutation { actualizarCalificacion(id:$id, nota:$nota) { id nota observaciones } }
 * @param {object} input – { id: string, nota: number }
 * @returns {Promise<Calificacion>} El objeto Calificación { id, nota, observaciones } actualizado
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
  const data = await invokeBECALIF(mutation, { id, nota });
  return data.actualizarCalificacion;
}

/**
 * Invoca BECALIF → mutation { eliminarCalificacion(id:$id) }
 * @param {object} input – { id: string }
 * @returns {Promise<boolean>} True si se eliminó la calificación, false si no se encontró
 */
async function eliminarCalificacion({ id }) {
  const mutation = `
    mutation ($id: ID!) {
      eliminarCalificacion(id: $id)
    }
  `;
  const data = await invokeBECALIF(mutation, { id });
  return data.eliminarCalificacion; // true o false
}

module.exports = {
  getHolaMundoFromBECALIF,
  getCalificaciones,
  registrarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion
};

