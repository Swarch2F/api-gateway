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
    
     /**
     * --- CORRECCIÓN ---
     * El resolver ahora envuelve la respuesta del servicio en el objeto 'CalificacionResponse'
     * que define el schema. Esto asegura que la estructura de la respuesta sea consistente
     * con las otras mutaciones y con lo que el frontend espera.
     */
     actualizarCalificacion: async (_, { id, nota, observaciones }) => {
      try {
        const calificacionActualizada = await actualizarCalificacion({ id, nota, observaciones });
        return {
          success: true,
          message: "Calificación actualizada correctamente",
          calificacion: calificacionActualizada,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: "Error al actualizar calificación",
          calificacion: null,
          errors: [error.message || "Error desconocido"]
        };
      }
    },
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