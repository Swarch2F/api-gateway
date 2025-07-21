const { invokeBECALIF } = require('./baseService');

// —————— OPERACIÓN "holaMundo" ——————

/**
 * Invoca BECALIF para obtener un mensaje de saludo simple.
 * @returns {Promise<string>} El string "holaMundo" del servicio.
 */
async function getHolaMundoFromBECALIF() {
  const query = `query { holaMundo }`;
  const data = await invokeBECALIF(query);
  return data.holaMundo;
}

// —————— QUERIES de Calificaciones ——————

/**
 * Invoca BECALIF para obtener calificaciones con filtros opcionales.
 * @param {Object} filters - Filtros opcionales para la consulta.
 * @param {string=} filters.estudianteId - Filtrar por ID de estudiante (opcional).
 * @param {string=} filters.asignaturaId - Filtrar por ID de asignatura (opcional).
 * @param {string=} filters.cursoId - Filtrar por ID de curso (opcional).
 * @param {string=} filters.periodo - Filtrar por periodo (opcional).
 * @returns {Promise<Array>} Un array de objetos calificación.
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
 * Invoca BECALIF para registrar una nueva calificación.
 * @param {Object} input - Los datos de entrada para crear una calificación.
 * @param {string} input.estudianteId - El ID del estudiante.
 * @param {string} input.asignaturaId - El ID de la asignatura.
 * @param {string} input.cursoId - El ID del curso.
 * @param {string} input.periodo - El periodo académico.
 * @param {number} input.nota - La nota.
 * @param {string=} input.observaciones - Observaciones opcionales.
 * @returns {Promise<Object>} El objeto calificación creado.
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
 * Invoca BECALIF para actualizar una calificación existente.
 * @param {Object} input - Los datos de entrada para actualizar una calificación.
 * @param {string} input.id - El ID de la calificación a actualizar.
 * @param {number=} input.nota - La nueva nota (opcional).
 * @param {string=} input.observaciones - Las nuevas observaciones (opcional).
 * @returns {Promise<Object>} El objeto calificación actualizado.
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
 * Invoca BECALIF para eliminar una calificación por su ID.
 * @param {Object} input - Los datos de entrada para eliminar una calificación.
 * @param {string} input.id - El ID de la calificación a eliminar.
 * @returns {Promise<Object>} Un objeto con success, message y errors.
 */
async function eliminarCalificacion({ id }) {
  const mutation = `
    mutation($id: ID!) {
      eliminarCalificacion(id: $id)
    }
  `;
  const data = await invokeBECALIF(mutation, { id });
  // Adaptar el booleano a un objeto CalificacionResponse
  return {
    success: !!data.eliminarCalificacion,
    message: data.eliminarCalificacion ? "Calificación eliminada correctamente" : "No se pudo eliminar la calificación",
    errors: data.eliminarCalificacion ? [] : ["No se pudo eliminar la calificación"]
  };
}

module.exports = {
  getHolaMundoFromBECALIF,
  getCalificaciones,
  registrarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion
};
