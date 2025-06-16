const {
  getAsignaturas,
  getAsignaturaPorId,
  crearAsignatura,
  actualizarAsignatura,
  eliminarAsignatura,
  asignarProfesorAAsignatura,
  desasignarProfesorDeAsignatura
} = require('../../services/subjectService');

const subjectResolver = {
  Query: {
    asignaturas: async () => getAsignaturas(),
    asignaturaPorId: async (_, { id }) => getAsignaturaPorId(id)
  },
  Mutation: {
    crearAsignatura: async (_, { nombre }) => crearAsignatura({ nombre }),
    actualizarAsignatura: async (_, { id, nombre }) => 
      actualizarAsignatura({ id, nombre }),
    eliminarAsignatura: async (_, { id }) => eliminarAsignatura({ id }),
    asignarProfesorAAsignatura: async (_, { profesorId, asignaturaId }) =>
      asignarProfesorAAsignatura({ profesorId, asignaturaId }),
    desasignarProfesorDeAsignatura: async (_, { profesorId, asignaturaId }) =>
      desasignarProfesorDeAsignatura({ profesorId, asignaturaId })
  }
};

module.exports = subjectResolver; 