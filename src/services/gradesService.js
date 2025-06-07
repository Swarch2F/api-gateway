const { invokeBECALIF } = require('./baseService');

// —————— OPERACIÓN "holaMundo" ——————

/**
 * Invokes BECALIF to fetch a simple greeting message.
 * @returns {Promise<string>} The "holaMundo" string from the service.
 */
async function getHolaMundoFromBECALIF() {
  const query = `query { holaMundo }`;
  const data = await invokeBECALIF(query);
  return data.holaMundo;
}

// —————— QUERIES de Calificaciones ——————

/**
 * Invokes BECALIF to fetch calificaciones with optional filters.
 * @param {Object} filters - Optional filters for the query.
 * @param {string=} filters.estudianteId - Filter by student ID (optional).
 * @param {string=} filters.asignaturaId - Filter by subject ID (optional).
 * @param {string=} filters.cursoId - Filter by course ID (optional).
 * @param {string=} filters.periodo - Filter by period (optional).
 * @returns {Promise<Array>} An array of calificacion objects.
 */
async function getCalificaciones(filters = {}) {
  const { estudianteId, asignaturaId, cursoId, periodo } = filters;
  
  // Construir la query con parámetros opcionales
  const variables = {};
  const params = [];
  
  if (estudianteId) {
    variables.estudianteId = estudianteId;
    params.push('estudianteId: $estudianteId');
  }
  if (asignaturaId) {
    variables.asignaturaId = asignaturaId;
    params.push('asignaturaId: $asignaturaId');
  }
  if (cursoId) {
    variables.cursoId = cursoId;
    params.push('cursoId: $cursoId');
  }
  if (periodo) {
    variables.periodo = periodo;
    params.push('periodo: $periodo');
  }

  const parametros = params.length > 0 ? `(${params.join(', ')})` : '';
  
  const query = `
    query ${Object.keys(variables).length > 0 ? `(${Object.keys(variables).map(key => `$${key}: ${key.includes('Id') ? 'ID' : 'String'}`).join(', ')})` : ''} {
      calificaciones${parametros} {
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
  
  const data = await invokeBECALIF(query, variables);
  return data.calificaciones;
}

// —————— MUTATIONS de Calificaciones ——————

/**
 * Invokes BECALIF to register a new calificacion.
 * @param {Object} input - The input data for creating a calificacion.
 * @param {string} input.estudianteId - The student ID.
 * @param {string} input.asignaturaId - The subject ID.
 * @param {string} input.cursoId - The course ID.
 * @param {string} input.periodo - The academic period.
 * @param {number} input.nota - The grade score.
 * @param {string=} input.observaciones - Optional observations.
 * @returns {Promise<Object>} The created calificacion object.
 */
async function registrarCalificacion({
  estudianteId,
  asignaturaId,
  cursoId,
  periodo,
  nota,
  observaciones
}) {
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
        cursoId
        periodo
        nota
        observaciones
      }
    }
  `;
  
  const variables = {
    estudianteId,
    asignaturaId,
    cursoId,
    periodo,
    nota,
    observaciones
  };
  
  const data = await invokeBECALIF(mutation, variables);
  return data.registrarCalificacion;
}

/**
 * Invokes BECALIF to update an existing calificacion.
 * @param {Object} input - The input data for updating a calificacion.
 * @param {string} input.id - The ID of the calificacion to update.
 * @param {number=} input.nota - The new grade score (optional).
 * @param {string=} input.observaciones - The new observations (optional).
 * @returns {Promise<Object>} The updated calificacion object.
 */
async function actualizarCalificacion({ id, nota, observaciones }) {
  const mutation = `
    mutation ($id: ID!, $nota: Float, $observaciones: String) {
      actualizarCalificacion(
        id: $id,
        nota: $nota,
        observaciones: $observaciones
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
  
  const variables = { id, nota, observaciones };
  const data = await invokeBECALIF(mutation, variables);
  return data.actualizarCalificacion;
}

/**
 * Invokes BECALIF to delete a calificacion by its ID.
 * @param {Object} input - The input data for deleting a calificacion.
 * @param {string} input.id - The ID of the calificacion to delete.
 * @returns {Promise<boolean>} True if the deletion was successful, otherwise false.
 */
async function eliminarCalificacion({ id }) {
  const mutation = `
    mutation ($id: ID!) {
      eliminarCalificacion(id: $id)
    }
  `;
  const data = await invokeBECALIF(mutation, { id });
  return data.eliminarCalificacion;
}

module.exports = {
  getHolaMundoFromBECALIF,
  getCalificaciones,
  registrarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion
};

