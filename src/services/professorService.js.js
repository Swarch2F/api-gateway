/*************  ✨ Windsurf Command 🌟  *************/
const {invokeBECALIF} = require('./baseService')

// —————— OPERACIÓN “holaMundo” ——————

/**
 * Invoca BECALIF → { holaMundo }
 * @returns {string} El string "hola mundo"
 */
async function getHolaMundoFromBECALIF() {
  const query = `query { holaMundo }`;
  const { holaMundo } = await invokeBECALIF(query);
  return holaMundo;
  const data = await invokeBECALIF(query);
  return data.holaMundo;
}

// —————— QUERIES de Profesores y Asignaturas ——————

/**
 * Invoca BECALIF → { profesores { id nombre documento area } }
 * @returns {Array.<{id: string, nombre: string, documento: string, area: string}>} La lista de profesores
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
  const { profesores } = await invokeBECALIF(query);
  return profesores; // [ { id, nombre, documento, area }, ... ]
  const data = await invokeBECALIF(query);
  return data.profesores; // [ { id, nombre, documento, area }, ... ]
}

/**
 * Invoca BECALIF → { profesorPorId(id: $id) { id nombre documento area } }
 * @param {string} id Identificador del profesor
 * @returns {{id: string, nombre: string, documento: string, area: string} | null} El profesor o null si no existe
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
  const { profesorPorId } = await invokeBECALIF(query, { id });
  return profesorPorId; // { id, nombre, documento, area } o null
  const data = await invokeBECALIF(query, { id });
  return data.profesorPorId; // { id, nombre, documento, area } o null
}





// —————— MUTATIONS de Profesor y Asignatura ——————

/**
 * Invoca BECALIF → mutation { crearProfesor(nombre:$nombre, documento:$documento, area:$area) { id nombre area } }
 * @param {object} input  – { nombre: string, documento: string, area: string }
 * @returns {{id: string, nombre: string, area: string}} El profesor creado
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
  const { crearProfesor } = await invokeBECALIF(mutation, { nombre, documento, area });
  return crearProfesor; // { id, nombre, area }
  const data = await invokeBECALIF(mutation, { nombre, documento, area });
  return data.crearProfesor; // { id, nombre, area }
}

/**
 * Invoca BECALIF → mutation { actualizarProfesor(id:$id, nombre:$nombre, area:$area) { id nombre area documento } }
 * @param {object} input – { id: string, nombre?: string, area?: string }
 * @returns {{id: string, nombre: string, area: string, documento: string}} El profesor actualizado
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
  const { actualizarProfesor } = await invokeBECALIF(mutation, variables);
  return actualizarProfesor; // { id, nombre, area, documento }
  const data = await invokeBECALIF(mutation, variables);
  return data.actualizarProfesor; // { id, nombre, area, documento }
}

/**
 * Invoca BECALIF → mutation { eliminarProfesor(id:$id) }
 * @param {object} input – { id: string }
 * @returns {boolean} true si se eliminó con éxito, false de lo contrario
 */
async function eliminarProfesor({ id }) {
  const mutation = `
    mutation ($id: ID!) {
      eliminarProfesor(id: $id)
    }
  `;
  const { eliminarProfesor } = await invokeBECALIF(mutation, { id });
  return eliminarProfesor; // true o false
  const data = await invokeBECALIF(mutation, { id });
  return data.eliminarProfesor; // true o false
}



module.exports = {
  getHolaMundoFromBECALIF,
  getProfesores,
  getProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,

};

/*******  3c23ab46-4d87-4ba4-b2fd-de45004af720  *******/