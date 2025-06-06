const {invokeBEPROASIG} = require('./baseService')

// —————— OPERACIÓN “holaMundo” ——————

/**
 * Invoca BEPROASIG → { holaMundo }
 */
async function getHolaMundoFromBEPROASIG() {
  const query = `query { holaMundo }`;
  const data = await invokeBEPROASIG(query);
  return data.holaMundo;
}

// —————— QUERIES de Profesores y Asignaturas ——————

/**
 * Invoca BEPROASIG → { profesores { id nombre documento area } }
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
  const data = await invokeBEPROASIG(query);
  return data.profesores; // [ { id, nombre, documento, area }, ... ]
}

/**
 * Invoca BEPROASIG → { profesorPorId(id: $id) { id nombre documento area } }
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
  const data = await invokeBEPROASIG(query, { id });
  return data.profesorPorId; // { id, nombre, documento, area } o null
}





// —————— MUTATIONS de Profesor y Asignatura ——————

/**
 * Invoca BEPROASIG → mutation { crearProfesor(nombre:$nombre, documento:$documento, area:$area) { id nombre area } }
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
  const data = await invokeBEPROASIG(mutation, { nombre, documento, area });
  return data.crearProfesor; // { id, nombre, area }
}

/**
 * Invoca BEPROASIG → mutation { actualizarProfesor(id:$id, nombre:$nombre, area:$area) { id nombre area documento } }
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
  const data = await invokeBEPROASIG(mutation, variables);
  return data.actualizarProfesor; // { id, nombre, area, documento }
}

/**
 * Invoca BEPROASIG → mutation { eliminarProfesor(id:$id) }
 * @param {object} input – { id: string }
 */
async function eliminarProfesor({ id }) {
  const mutation = `
    mutation ($id: ID!) {
      eliminarProfesor(id: $id)
    }
  `;
  const data = await invokeBEPROASIG(mutation, { id });
  return data.eliminarProfesor; // true o false
}



module.exports = {
  getHolaMundoFromBEPROASIG,
  getProfesores,
  getProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,

};
