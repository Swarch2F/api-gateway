const { invokeBEPROASIG } = require('./baseService');

// —————— OPERACIÓN “holaMundo” ——————

/**
 * Invokes BEPROASIG to fetch a simple greeting message.
 * @returns {Promise<string>} The "holaMundo" string from the service.
 */
async function getHolaMundoFromBEPROASIG() {
  const query = `query { holaMundo }`;
  const data = await invokeBEPROASIG(query);
  return data.holaMundo;
}

// —————— QUERIES de Profesores y Asignaturas ——————

/**
 * Invokes BEPROASIG to fetch all professors.
 * @returns {Promise<Array>} An array of professor objects, each containing id, nombre, documento, and area.
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
  return data.profesores;
}

/**
 * Invokes BEPROASIG to fetch a professor by their ID.
 * @param {string} id - The ID of the professor to retrieve.
 * @returns {Promise<Object|null>} The professor object or null if not found, containing id, nombre, documento, and area.
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
  return data.profesorPorId;
}

// —————— MUTATIONS de Profesor y Asignatura ——————

/**
 * Invokes BEPROASIG to create a new professor.
 * @param {Object} input - The input data for creating a professor.
 * @param {string} input.nombre - The name of the professor.
 * @param {string} input.documento - The document identifier of the professor.
 * @param {string} input.area - The area of expertise of the professor.
 * @returns {Promise<Object>} The created professor object containing id, nombre, and area.
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
  return data.crearProfesor;
}

/**
 * Invokes BEPROASIG to update an existing professor's details.
 * @param {Object} input - The input data for updating a professor.
 * @param {string} input.id - The ID of the professor to update.
 * @param {string=} input.nombre - The new name of the professor (optional).
 * @param {string=} input.area - The new area of expertise of the professor (optional).
 * @returns {Promise<Object>} The updated professor object containing id, nombre, area, and documento.
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
  return data.actualizarProfesor;
}

/**
 * Invokes BEPROASIG to delete a professor by their ID.
 * @param {Object} input - The input data for deleting a professor.
 * @param {string} input.id - The ID of the professor to delete.
 * @returns {Promise<boolean>} True if the deletion was successful, otherwise false.
 */
async function eliminarProfesor({ id }) {
  const mutation = `
    mutation ($id: ID!) {
      eliminarProfesor(id: $id)
    }
  `;
  const data = await invokeBEPROASIG(mutation, { id });
  return data.eliminarProfesor;
}

module.exports = {
  getHolaMundoFromBEPROASIG,
  getProfesores,
  getProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,
};

