const {invokeMS1} = require('./baseService')

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
  getAsignaturas,
  getAsignaturaPorId,
  crearAsignatura,
  asignarProfesorAAsignatura,
};
