const fetch = require("node-fetch");
const DataLoader = require("dataloader");
const { GX_SIA_URL } = require("../configs/config");

// =============== DATALOADERS ===============

/**
 * DataLoader para cargar múltiples cursos por IDs de forma eficiente
 */
const cursoLoader = new DataLoader(async (ids) => {
  try {
    // Hacer una sola consulta para obtener todos los cursos
    const promises = ids.map(id => getCurso(id));
    return await Promise.all(promises);
  } catch (error) {
    // Si falla, retornar null para cada ID
    return ids.map(() => null);
  }
});

/**
 * DataLoader para cargar estudiantes de múltiples cursos de forma eficiente
 */
const cursoEstudiantesLoader = new DataLoader(async (cursoIds) => {
  try {
    // Hacer consultas paralelas para obtener estudiantes de cada curso
    const promises = cursoIds.map(id => getCursoEstudiantes(id));
    return await Promise.all(promises);
  } catch (error) {
    // Si falla, retornar array vacío para cada curso
    return cursoIds.map(() => []);
  }
});

// =============== FUNCIONES AUXILIARES ===============

/**
 * Helper para invocar endpoints REST del microservicio SIA Colegios (Component-1)
 * @param {string} endpoint - El endpoint a invocar (ej: '/cursos/', '/estudiantes/')
 * @param {string} method - Método HTTP (GET, POST, PUT, PATCH, DELETE)
 * @param {Object} data - Datos a enviar en el body (para POST, PUT, PATCH)
 * @param {Object} params - Parámetros de query string
 * @returns {Promise<Object>} El resultado de la consulta REST en formato JSON
 */
async function invokeSIAEndpoint(endpoint, method = 'GET', data = null, params = {}) {
  // Construir URL con parámetros
  const url = new URL(`${GX_SIA_URL}${endpoint}`);
  Object.keys(params).forEach(key => {
    if (params[key] !== undefined && params[key] !== null) {
      url.searchParams.append(key, params[key]);
    }
  });

  const options = {
    method: method,
    headers: { 'Content-Type': 'application/json' }
  };

  // Agregar body para métodos que lo requieren
  if (data && ['POST', 'PUT', 'PATCH'].includes(method)) {
    options.body = JSON.stringify(data);
  }

  try {
    const response = await fetch(url.toString(), options);
    
    // Manejar respuestas vacías (como DELETE exitoso)
    if (response.status === 204) {
      return { success: true };
    }

    const result = await response.json();
    
    if (!response.ok) {
      throw new Error(`SIA Error (${response.status}): ${JSON.stringify(result)}`);
    }
    
    return result;
  } catch (error) {
    throw new Error(`SIA Service Error: ${error.message}`);
  }
}

// =============== SERVICIOS PARA CURSOS ===============

/**
 * Obtener todos los cursos con filtros opcionales
 */
async function getCursos(search = null, ordering = null, page = null) {
  const params = {};
  if (search) params.search = search;
  if (ordering) params.ordering = ordering;
  if (page) params.page = page;
  
  return await invokeSIAEndpoint('/cursos/', 'GET', null, params);
}

/**
 * Obtener un curso por ID
 */
async function getCurso(id) {
  return await invokeSIAEndpoint(`/cursos/${id}/`, 'GET');
}

/**
 * Crear un nuevo curso
 */
async function createCurso(cursoData) {
  return await invokeSIAEndpoint('/cursos/', 'POST', cursoData);
}

/**
 * Actualizar un curso completamente
 */
async function updateCurso(id, cursoData) {
  return await invokeSIAEndpoint(`/cursos/${id}/`, 'PUT', cursoData);
}

/**
 * Actualizar un curso parcialmente
 */
async function updateCursoParcial(id, cursoData) {
  return await invokeSIAEndpoint(`/cursos/${id}/`, 'PATCH', cursoData);
}

/**
 * Eliminar un curso
 */
async function deleteCurso(id) {
  return await invokeSIAEndpoint(`/cursos/${id}/`, 'DELETE');
}

/**
 * Obtener estudiantes de un curso específico
 */
async function getCursoEstudiantes(id) {
  return await invokeSIAEndpoint(`/cursos/${id}/estudiantes/`, 'GET');
}

// =============== SERVICIOS PARA ESTUDIANTES ===============

/**
 * Obtener todos los estudiantes con filtros opcionales
 */
async function getEstudiantes(search = null, ordering = null, page = null) {
  const params = {};
  if (search) params.search = search;
  if (ordering) params.ordering = ordering;
  if (page) params.page = page;
  
  return await invokeSIAEndpoint('/estudiantes/', 'GET', null, params);
}

/**
 * Obtener un estudiante por ID
 */
async function getEstudiante(id) {
  return await invokeSIAEndpoint(`/estudiantes/${id}/`, 'GET');
}

/**
 * Crear un nuevo estudiante
 */
async function createEstudiante(estudianteData) {
  return await invokeSIAEndpoint('/estudiantes/', 'POST', estudianteData);
}

/**
 * Actualizar un estudiante completamente
 */
async function updateEstudiante(id, estudianteData) {
  return await invokeSIAEndpoint(`/estudiantes/${id}/`, 'PUT', estudianteData);
}

/**
 * Actualizar un estudiante parcialmente
 */
async function updateEstudianteParcial(id, estudianteData) {
  return await invokeSIAEndpoint(`/estudiantes/${id}/`, 'PATCH', estudianteData);
}

/**
 * Eliminar un estudiante
 */
async function deleteEstudiante(id) {
  return await invokeSIAEndpoint(`/estudiantes/${id}/`, 'DELETE');
}

/**
 * Obtener estudiantes por código de curso
 */
async function getEstudiantesPorCurso(codigo) {
  const params = { codigo };
  return await invokeSIAEndpoint('/estudiantes/por_curso/', 'GET', null, params);
}

module.exports = {
  // Servicios generales
  invokeSIAEndpoint,
  
  // DataLoaders optimizados
  cursoLoader,
  cursoEstudiantesLoader,
  
  // Servicios de cursos
  getCursos,
  getCurso,
  createCurso,
  updateCurso,
  updateCursoParcial,
  deleteCurso,
  getCursoEstudiantes,
  
  // Servicios de estudiantes
  getEstudiantes,
  getEstudiante,
  createEstudiante,
  updateEstudiante,
  updateEstudianteParcial,
  deleteEstudiante,
  getEstudiantesPorCurso
}; 