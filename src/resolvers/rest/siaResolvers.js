const siaService = require('../../services/siaService');

const siaResolvers = {
  Query: {
    // =============== QUERIES DE CURSOS ===============
    
    /**
     * Obtener todos los cursos con filtros opcionales
     */
    cursos: async (_, { search, ordering, page }) => {
      try {
        const result = await siaService.getCursos(search, ordering, page);
        return {
          count: result.count || 0,
          next: result.next || null,
          previous: result.previous || null,
          results: result.results || []
        };
      } catch (error) {
        throw new Error(`Error al obtener cursos: ${error.message}`);
      }
    },

    /**
     * Obtener un curso por ID
     */
    curso: async (_, { id }) => {
      try {
        return await siaService.getCurso(id);
      } catch (error) {
        throw new Error(`Error al obtener curso: ${error.message}`);
      }
    },

    /**
     * Obtener estudiantes de un curso específico
     */
    cursoEstudiantes: async (_, { id }) => {
      try {
        return await siaService.getCursoEstudiantes(id);
      } catch (error) {
        throw new Error(`Error al obtener estudiantes del curso: ${error.message}`);
      }
    },

    // =============== QUERIES DE ESTUDIANTES ===============

    /**
     * Obtener todos los estudiantes con filtros opcionales
     */
    estudiantes: async (_, { search, ordering, page }) => {
      try {
        const result = await siaService.getEstudiantes(search, ordering, page);
        return {
          count: result.count || 0,
          next: result.next || null,
          previous: result.previous || null,
          results: result.results || []
        };
      } catch (error) {
        throw new Error(`Error al obtener estudiantes: ${error.message}`);
      }
    },

    /**
     * Obtener un estudiante por ID
     */
    estudiante: async (_, { id }) => {
      try {
        return await siaService.getEstudiante(id);
      } catch (error) {
        throw new Error(`Error al obtener estudiante: ${error.message}`);
      }
    },

    /**
     * Obtener estudiantes por código de curso
     */
    estudiantesPorCurso: async (_, { codigo }) => {
      try {
        return await siaService.getEstudiantesPorCurso(codigo);
      } catch (error) {
        throw new Error(`Error al obtener estudiantes por curso: ${error.message}`);
      }
    }
  },

  Mutation: {
    // =============== MUTATIONS DE CURSOS ===============

    /**
     * Crear nuevo curso
     */
    crearCurso: async (_, { input }) => {
      try {
        const cursoData = {
          nombre: input.nombre,
          codigo: input.codigo
        };
        return await siaService.createCurso(cursoData);
      } catch (error) {
        throw new Error(`Error al crear curso: ${error.message}`);
      }
    },

    /**
     * Actualizar curso completamente
     */
    actualizarCurso: async (_, { id, input }) => {
      try {
        const cursoData = {
          nombre: input.nombre,
          codigo: input.codigo
        };
        return await siaService.updateCurso(id, cursoData);
      } catch (error) {
        throw new Error(`Error al actualizar curso: ${error.message}`);
      }
    },

    /**
     * Actualizar curso parcialmente
     */
    actualizarCursoParcial: async (_, { id, nombre, codigo }) => {
      try {
        const cursoData = {};
        if (nombre !== undefined) cursoData.nombre = nombre;
        if (codigo !== undefined) cursoData.codigo = codigo;
        
        return await siaService.updateCursoParcial(id, cursoData);
      } catch (error) {
        throw new Error(`Error al actualizar curso parcialmente: ${error.message}`);
      }
    },

    /**
     * Eliminar curso
     */
    eliminarCurso: async (_, { id }) => {
      try {
        const result = await siaService.deleteCurso(id);
        return result.success || true;
      } catch (error) {
        throw new Error(`Error al eliminar curso: ${error.message}`);
      }
    },

    // =============== MUTATIONS DE ESTUDIANTES ===============

    /**
     * Crear nuevo estudiante
     */
    crearEstudiante: async (_, { input }) => {
      try {
        const estudianteData = {
          nombre_completo: input.nombreCompleto,
          documento: input.documento,
          fecha_nacimiento: input.fechaNacimiento,
          acudiente: input.acudiente,
          curso: input.curso
        };
        return await siaService.createEstudiante(estudianteData);
      } catch (error) {
        throw new Error(`Error al crear estudiante: ${error.message}`);
      }
    },

    /**
     * Actualizar estudiante completamente
     */
    actualizarEstudiante: async (_, { id, input }) => {
      try {
        const estudianteData = {
          nombre_completo: input.nombreCompleto,
          documento: input.documento,
          fecha_nacimiento: input.fechaNacimiento,
          acudiente: input.acudiente,
          curso: input.curso
        };
        return await siaService.updateEstudiante(id, estudianteData);
      } catch (error) {
        throw new Error(`Error al actualizar estudiante: ${error.message}`);
      }
    },

    /**
     * Actualizar estudiante parcialmente
     */
    actualizarEstudianteParcial: async (_, { id, nombreCompleto, documento, fechaNacimiento, acudiente, curso }) => {
      try {
        const estudianteData = {};
        if (nombreCompleto !== undefined) estudianteData.nombre_completo = nombreCompleto;
        if (documento !== undefined) estudianteData.documento = documento;
        if (fechaNacimiento !== undefined) estudianteData.fecha_nacimiento = fechaNacimiento;
        if (acudiente !== undefined) estudianteData.acudiente = acudiente;
        if (curso !== undefined) estudianteData.curso = curso;
        
        return await siaService.updateEstudianteParcial(id, estudianteData);
      } catch (error) {
        throw new Error(`Error al actualizar estudiante parcialmente: ${error.message}`);
      }
    },

    /**
     * Eliminar estudiante
     */
    eliminarEstudiante: async (_, { id }) => {
      try {
        const result = await siaService.deleteEstudiante(id);
        return result.success || true;
      } catch (error) {
        throw new Error(`Error al eliminar estudiante: ${error.message}`);
      }
    }
  },

  // =============== RESOLVERS DE RELACIONES ===============

  /**
   * Resolver para obtener estudiantes de un curso
   */
  Curso: {
    estudiantes: async (parent) => {
      try {
        return await siaService.getCursoEstudiantes(parent.id);
      } catch (error) {
        // Si hay error, retornar array vacío en lugar de fallar
        console.warn(`Error al obtener estudiantes del curso ${parent.id}: ${error.message}`);
        return [];
      }
    }
  },

  /**
   * Resolver para obtener el curso de un estudiante
   */
  Estudiante: {
    curso: async (parent) => {
      try {
        // Si el estudiante ya tiene el curso cargado (por ejemplo en la respuesta detallada)
        if (parent.curso && typeof parent.curso === 'object') {
          return parent.curso;
        }
        
        // Si solo tenemos el ID del curso, necesitamos obtenerlo
        if (parent.curso) {
          return await siaService.getCurso(parent.curso);
        }
        
        return null;
      } catch (error) {
        console.warn(`Error al obtener curso del estudiante ${parent.id}: ${error.message}`);
        return null;
      }
    },

    // Mapear campos del REST API al GraphQL schema
    nombreCompleto: (parent) => parent.nombre_completo || parent.nombreCompleto,
    fechaNacimiento: (parent) => parent.fecha_nacimiento || parent.fechaNacimiento,
    fechaRegistro: (parent) => parent.fecha_registro || parent.fechaRegistro
  }
};

module.exports = siaResolvers; 