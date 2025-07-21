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
      { input }
    ) => {
      try {
        const calificacion = await registrarCalificacion(input);
        return {
          success: true,
          message: "Calificación registrada correctamente",
          calificacion,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: "Error al registrar calificación",
          calificacion: null,
          errors: [error.message || "Error desconocido"]
        };
      }
    },
    actualizarCalificacion: async (_, { id, nota, observaciones }) =>
      actualizarCalificacion({ id, nota, observaciones }),
    eliminarCalificacion: async (_, { id }) => {
      try {
        const result = await eliminarCalificacion({ id });
        return {
          success: result.success,
          message: result.message || "Calificación eliminada correctamente",
          calificacion: null,
          errors: result.errors || []
        };
      } catch (error) {
        return {
          success: false,
          message: "Error al eliminar calificación",
          calificacion: null,
          errors: [error.message || "Error desconocido"]
        };
      }
    }
  }
};

module.exports = gradeResolver; 