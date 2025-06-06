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
  asignarProfesorAAsignatura
} = require('../../services/subjectService.js');

const {
  getHolaMundoFromBECALIF,
  getCalificaciones,
  registrarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion
} = require('../../services/gradesService.js');

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
     * Devuelve un array de objetos Calificaci n
     * @param {Object} args - Los argumentos para filtrar las calificaciones
     */
    calificaciones: async (_, args) => getCalificaciones(args)
  },

  /**
   * Los resolvers para las operaciones de escritura
   */
  Mutation: {
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

    /**
     * Crea una nueva asignatura
     * @param {string} nombre - El nombre de la asignatura
     */
    crearAsignatura: async (_, { nombre }) => crearAsignatura({ nombre }),
    /**
     * Asigna un profesor a una asignatura
     * @param {string} profesorId - El ID del profesor a asignar
     * @param {string} asignaturaId - El ID de la asignatura a asignar
     */
    asignarProfesorAAsignatura: async (_, { profesorId, asignaturaId }) =>
      asignarProfesorAAsignatura({ profesorId, asignaturaId }),

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
     * Actualiza una calificaci n existente
     * @param {string} id - El ID de la calificaci n a actualizar
     * @param {number} nota - La nueva nota de la calificaci n
     */
    actualizarCalificacion: async (_, { id, nota }) =>
      actualizarCalificacion({ id, nota }),
    /**
     * Elimina una calificaci n existente
     * @param {string} id - El ID de la calificaci n a eliminar
     */
    eliminarCalificacion: async (_, { id }) => eliminarCalificacion({ id })
  }
};

module.exports = resolvers;

