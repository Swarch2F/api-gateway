const {
  getHolaMundoFromBECALIF,
  getCalificaciones,
  registrarCalificacion,
  actualizarCalificacion,
  eliminarCalificacion
} = require('../../services/gradesService');

const gradeResolver = {
  Query: {
    holaMundo2: async () => getHolaMundoFromBECALIF(),
    calificaciones: async (_, args) => getCalificaciones(args)
  },
  Mutation: {
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
    actualizarCalificacion: async (_, { id, nota, observaciones }) =>
      actualizarCalificacion({ id, nota, observaciones }),
    eliminarCalificacion: async (_, { id }) => eliminarCalificacion({ id })
  }
};

module.exports = gradeResolver; 