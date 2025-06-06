/**
 * Servicio para interactuar con la API de asignaturas de BEPROASIG
 */

const { invokeBEPROASIG } = require('./baseService');

/**
 * Invoca BEPROASIG → { asignaturas { id nombre profesorIds } }
 * @returns {Promise<Asignatura[]>} Un array de objetos Asignatura { id, nombre, profesorIds }
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
  const data = await invokeBEPROASIG(query);
  return data.asignaturas;
}

/**
 * Invoca BEPROASIG → { asignaturaPorId(id: $id) { id nombre profesorIds } }
 * @param {string} id - El ID de la asignatura a buscar
 * @returns {Promise<Asignatura | null>} El objeto Asignatura { id, nombre, profesorIds } o null si no se encontró
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
  const data = await invokeBEPROASIG(query, { id });
  return data.asignaturaPorId;
}

/**
 * Invoca BEPROASIG → mutation { crearAsignatura(nombre:$nombre) { id nombre profesorIds } }
 * @param {object} input - El objeto con los datos de la asignatura a crear { nombre: string }
 * @returns {Promise<Asignatura>} El objeto Asignatura { id, nombre, profesorIds } creado
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
  const data = await invokeBEPROASIG(mutation, { nombre });
  return data.crearAsignatura;
}

/**
 * Invoca BEPROASIG → mutation { asignarProfesorAAsignatura(profesorId:$profesorId, asignaturaId:$asignaturaId) { id nombre profesorIds } }
 * @param {object} input - El objeto con los datos del profesor y la asignatura a asignar { profesorId: string, asignaturaId: string }
 * @returns {Promise<Asignatura>} El objeto Asignatura { id, nombre, profesorIds } actualizado
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
  const data = await invokeBEPROASIG(mutation, { profesorId, asignaturaId });
  return data.asignarProfesorAAsignatura;
}

module.exports = {
  getAsignaturas,
  getAsignaturaPorId,
  crearAsignatura,
  asignarProfesorAAsignatura,
};

