const {
  getHolaMundoFromBEPROASIG,
  getProfesores,
  getProfesorPorId,
  crearProfesor,
  actualizarProfesor,
  eliminarProfesor
} = require('../../services/professorService.js');
const subjectService = require('../../services/subjectService');

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
  },
  Profesor: {
    asignaturas: async (profesor) => {
      try {
        console.log('Resolver asignaturas llamado para profesor:', profesor.id);
        const asignaturas = await subjectService.getAsignaturas();
        console.log('Asignaturas obtenidas:', asignaturas);
        if (!asignaturas || !Array.isArray(asignaturas)) {
          console.log('Asignaturas no es un array válido, retornando []');
          return [];
        }
        const filtradas = asignaturas.filter(a => 
          a && a.profesorIds && Array.isArray(a.profesorIds) && a.profesorIds.includes(profesor.id)
        );
        console.log('Asignaturas filtradas para profesor', profesor.id, ':', filtradas);
        return filtradas;
      } catch (error) {
        console.error('Error al obtener asignaturas del profesor:', error);
        return [];
      }
    }
  }
};

module.exports = professorResolver; 