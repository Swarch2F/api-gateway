const {
  getHolaMundoFromBEPROASIG,
  getProfesores,
  getProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor
} = require('../../services/professorService.js');

const professorResolver = {
  Query: {
    holaMundo1: async () => getHolaMundoFromBEPROASIG(),
    profesores: async () => getProfesores(),
    profesorPorId: async (_, { id }) => getProfesorPorId(id)
  },
  Mutation: {
    crearProfesor: async (_, { nombre, documento, area }) =>
      crearProfesor({ nombre, documento, area }),
    actualizarProfesor: async (_, { id, nombre, area }) =>
      actualizarProfesor({ id, nombre, area }),
    eliminarProfesor: async (_, { id }) => eliminarProfesor({ id })
  }
};

module.exports = professorResolver; 