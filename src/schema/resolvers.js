
const {
  getHolaMundoFromMS1,
  getProfesores,
  getProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor,

} = require('../services/professorService.js');

const {

  getAsignaturas,
  getAsignaturaPorId,
  crearAsignatura,
  asignarProfesorAAsignatura
} = require('../services/subjectService.js');


const {
  getHolaMundoFromMS2,
  getCalificaciones,
  registrarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion
} = require('../services/gradesService.js');

const resolvers = {
  Query: {
    holaMundo1: async () => getHolaMundoFromMS1(),
    profesores: async () => getProfesores(),
    profesorPorId: async (_, { id }) => getProfesorPorId(id),
    asignaturas: async () => getAsignaturas(),
    asignaturaPorId: async (_, { id }) => getAsignaturaPorId(id),

    holaMundo2: async () => getHolaMundoFromMS2(),
    calificaciones: async (_, args) => getCalificaciones(args)
  },

  Mutation: {
    crearProfesor: async (_, { nombre, documento, area }) =>
      crearProfesor({ nombre, documento, area }),
    actualizarProfesor: async (_, { id, nombre, area }) =>
      actualizarProfesor({ id, nombre, area }),
    eliminarProfesor: async (_, { id }) => eliminarProfesor({ id }),

    crearAsignatura: async (_, { nombre }) => crearAsignatura({ nombre }),
    asignarProfesorAAsignatura: async (_, { profesorId, asignaturaId }) =>
      asignarProfesorAAsignatura({ profesorId, asignaturaId }),

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
    actualizarCalificacion: async (_, { id, nota }) =>
      actualizarCalificacion({ id, nota }),
    eliminarCalificacion: async (_, { id }) => eliminarCalificacion({ id })
  }
};

module.exports = resolvers;
