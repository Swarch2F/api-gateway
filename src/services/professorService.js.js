const {invokeMS1} = require('./baseService')

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



module.exports = {
  getHolaMundoFromMS1,
  getProfesores,
  getProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,

};
