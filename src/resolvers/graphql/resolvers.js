/**
 * Los resolvers son funciones que se encargan de manejar las operaciones de
 * lectura y escritura en nuestra API GraphQL. Estas funciones se encargan de
 * llamar a los servicios correspondientes y devolver los resultados.
 *
 * En este caso, estamos importando los servicios de Profesor, Asignatura y
 * Calificaci n, y luego estamos creando los resolvers para cada una de las
 * operaciones definidas en el esquema.
 */
const {
  getHolaMundoFromBEPROASIG,
  getProfesores,
  getProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,
} = require('../../services/professorService.js.js');

const {
  getAsignaturas,
  getAsignaturaPorId,
  crearAsignatura,
  actualizarAsignatura,
  eliminarAsignatura,
  asignarProfesorAAsignatura,
  desasignarProfesorDeAsignatura
} = require('../../services/subjectService.js');

const {
  getHolaMundoFromBECALIF,
  getCalificaciones,
  registrarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion
} = require('../../services/gradesService.js');

const authService = require('../../services/authService.js');

// Importar resolvers de SIA Colegios
const siaResolvers = require('../rest/siaResolvers');

/**
 * Los resolvers para las operaciones de lectura
 */
const resolvers = {
  Query: {
    /**
     * Devuelve el string "holaMundo" desde el servicio BEPROASIG
     */
    holaMundo1: async () => getHolaMundoFromBEPROASIG(),
    /**
     * Devuelve un array de objetos Profesor
     */
    profesores: async () => getProfesores(),
    /**
     * Devuelve un objeto Profesor por su ID
     * @param {string} id - El ID del profesor a buscar
     */
    profesorPorId: async (_, { id }) => getProfesorPorId(id),
    /**
     * Devuelve un array de objetos Asignatura
     */
    asignaturas: async () => getAsignaturas(),
    /**
     * Devuelve un objeto Asignatura por su ID
     * @param {string} id - El ID de la asignatura a buscar
     */
    asignaturaPorId: async (_, { id }) => getAsignaturaPorId(id),
    /**
     * Devuelve el string "holaMundo" desde el servicio BECALIF
     */
    holaMundo2: async () => getHolaMundoFromBECALIF(),
    /**
     * Devuelve un array de objetos Calificación
     * @param {Object} args - Los argumentos para filtrar las calificaciones
     */
    calificaciones: async (_, args) => getCalificaciones(args),

    // —————— RESOLVERS DE AUTENTICACIÓN ——————
    /**
     * Obtiene la URL para login con Google
     */
    getGoogleLoginUrl: async () => authService.getGoogleLoginUrl(),
    
    /**
     * Obtiene el perfil del usuario autenticado
     * @param {Object} _ - Parent object (no usado)
     * @param {Object} args - Arguments (no usado)
     * @param {Object} context - Context que contiene headers de la request
     */
    userProfile: async (_, args, context) => {
      const authHeader = context.req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new Error('Token de autorización requerido. Formato: Bearer <token>');
      }
      const token = authHeader.substring(7);
      return authService.getUserProfile(token);
    },

    /**
     * Verifica el estado de autenticación del usuario
     */
    authStatus: async (_, __, { req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      return authService.checkAuthStatus(token);
    },

    // —————— RESOLVERS DE SIA COLEGIOS ——————
    // Queries de Cursos
    cursos: siaResolvers.Query.cursos,
    curso: siaResolvers.Query.curso,
    cursoEstudiantes: siaResolvers.Query.cursoEstudiantes,
    
    // Queries de Estudiantes
    estudiantes: siaResolvers.Query.estudiantes,
    estudiante: siaResolvers.Query.estudiante,
    estudiantesPorCurso: siaResolvers.Query.estudiantesPorCurso
  },

  /**
   * Los resolvers para las operaciones de escritura
   */
  Mutation: {
    // —————— MUTATIONS DE PROFESORES ——————
    /**
     * Crea un nuevo profesor
     * @param {string} nombre - El nombre del profesor
     * @param {string} documento - El documento del profesor
     * @param {string} area - El area del profesor
     */
    crearProfesor: async (_, { nombre, documento, area }) =>
      crearProfesor({ nombre, documento, area }),
    /**
     * Actualiza un profesor existente
     * @param {string} id - El ID del profesor a actualizar
     * @param {string} nombre - El nuevo nombre del profesor
     * @param {string} area - El nuevo area del profesor
     */
    actualizarProfesor: async (_, { id, nombre, area }) =>
      actualizarProfesor({ id, nombre, area }),
    /**
     * Elimina un profesor existente
     * @param {string} id - El ID del profesor a eliminar
     */
    eliminarProfesor: async (_, { id }) => eliminarProfesor({ id }),

    // —————— MUTATIONS DE ASIGNATURAS (MEJORADAS) ——————
    /**
     * Crea una nueva asignatura
     * @param {string} nombre - El nombre de la asignatura
     */
    crearAsignatura: async (_, { nombre }) => crearAsignatura({ nombre }),
    
    /**
     * Actualiza una asignatura existente
     * @param {string} id - El ID de la asignatura a actualizar
     * @param {string} nombre - El nuevo nombre de la asignatura
     */
    actualizarAsignatura: async (_, { id, nombre }) => 
      actualizarAsignatura({ id, nombre }),
    
    /**
     * Elimina una asignatura existente
     * @param {string} id - El ID de la asignatura a eliminar
     */
    eliminarAsignatura: async (_, { id }) => eliminarAsignatura({ id }),
    
    /**
     * Asigna un profesor a una asignatura
     * @param {string} profesorId - El ID del profesor a asignar
     * @param {string} asignaturaId - El ID de la asignatura a asignar
     */
    asignarProfesorAAsignatura: async (_, { profesorId, asignaturaId }) =>
      asignarProfesorAAsignatura({ profesorId, asignaturaId }),
    
    /**
     * Desasigna un profesor de una asignatura
     * @param {string} profesorId - El ID del profesor a desasignar
     * @param {string} asignaturaId - El ID de la asignatura a desasignar
     */
    desasignarProfesorDeAsignatura: async (_, { profesorId, asignaturaId }) =>
      desasignarProfesorDeAsignatura({ profesorId, asignaturaId }),

    // —————— MUTATIONS DE CALIFICACIONES (MEJORADAS) ——————
    /**
     * Registra una nueva calificaci n
     * @param {string} estudianteId - El ID del estudiante
     * @param {string} asignaturaId - El ID de la asignatura
     * @param {string} cursoId - El ID del curso
     * @param {string} periodo - El per odo de la calificaci n
     * @param {number} nota - La nota de la calificaci n
     * @param {string} observaciones - Las observaciones de la calificaci n
     */
    registrarCalificacion: async (
      _,
      { estudianteId, asignaturaId, cursoId, periodo, nota, observaciones }
    ) =>
      registrarCalificacion({
        estudianteId,
        asignaturaId,
        cursoId,
        periodo,
        nota,
        observaciones
      }),
    /**
     * Actualiza una calificaci n existente (MEJORADA con observaciones)
     * @param {string} id - El ID de la calificaci n a actualizar
     * @param {number} nota - La nueva nota de la calificaci n (opcional)
     * @param {string} observaciones - Las nuevas observaciones (opcional)
     */
    actualizarCalificacion: async (_, { id, nota, observaciones }) =>
      actualizarCalificacion({ id, nota, observaciones }),
    /**
     * Elimina una calificaci n existente
     * @param {string} id - El ID de la calificaci n a eliminar
     */
    eliminarCalificacion: async (_, { id }) => eliminarCalificacion({ id }),

    // —————— NUEVAS MUTATIONS DE AUTENTICACIÓN ——————
    /**
     * Registra un nuevo usuario
     * @param {Object} input - { email: string, password: string }
     */
    registerUser: async (_, { input }) => authService.registerUser(input),
    
    /**
     * Inicia sesión de usuario
     * @param {Object} input - { email: string, password: string }
     */
    loginUser: async (_, { input }) => authService.loginUser(input),
    
    /**
     * Cierra sesión del usuario
     */
    logout: async (_, __, { req }) => {
      const token = req.headers.authorization?.split(' ')[1];
      return authService.logoutUser(token);
    },

    // —————— NUEVAS MUTATIONS DE SIA COLEGIOS ——————
    // Mutations de Cursos
    crearCurso: siaResolvers.Mutation.crearCurso,
    actualizarCurso: siaResolvers.Mutation.actualizarCurso,
    actualizarCursoParcial: siaResolvers.Mutation.actualizarCursoParcial,
    eliminarCurso: siaResolvers.Mutation.eliminarCurso,
    
    // Mutations de Estudiantes
    crearEstudiante: siaResolvers.Mutation.crearEstudiante,
    actualizarEstudiante: siaResolvers.Mutation.actualizarEstudiante,
    actualizarEstudianteParcial: siaResolvers.Mutation.actualizarEstudianteParcial,
    eliminarEstudiante: siaResolvers.Mutation.eliminarEstudiante
  },

  // —————— RESOLVERS DE RELACIONES SIA COLEGIOS ——————
  Curso: siaResolvers.Curso,
  Estudiante: siaResolvers.Estudiante
};

module.exports = resolvers;

