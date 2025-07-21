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
        const curso = await siaService.createCurso(cursoData);
        return {
          success: true,
          message: "Curso creado exitosamente",
          curso: curso,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: `Error al crear curso: ${error.message}`,
          curso: null,
          errors: [error.message]
        };
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
        const curso = await siaService.updateCurso(id, cursoData);
        return {
          success: true,
          message: "Curso actualizado exitosamente",
          curso: curso,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: `Error al actualizar curso: ${error.message}`,
          curso: null,
          errors: [error.message]
        };
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
        
        const curso = await siaService.updateCursoParcial(id, cursoData);
        return {
          success: true,
          message: "Curso actualizado exitosamente",
          curso: curso,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: `Error al actualizar curso parcialmente: ${error.message}`,
          curso: null,
          errors: [error.message]
        };
      }
    },

    /**
     * Eliminar curso
     */
    eliminarCurso: async (_, { id }) => {
      try {
        const result = await siaService.deleteCurso(id);
        return {
          success: true,
          message: "Curso eliminado exitosamente",
          curso: null,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: `Error al eliminar curso: ${error.message}`,
          curso: null,
          errors: [error.message]
        };
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
        const estudiante = await siaService.createEstudiante(estudianteData);
        return {
          success: true,
          message: "Estudiante creado exitosamente",
          estudiante: estudiante,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: `Error al crear estudiante: ${error.message}`,
          estudiante: null,
          errors: [error.message]
        };
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
        const estudiante = await siaService.updateEstudiante(id, estudianteData);
        return {
          success: true,
          message: "Estudiante actualizado exitosamente",
          estudiante: estudiante,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: `Error al actualizar estudiante: ${error.message}`,
          estudiante: null,
          errors: [error.message]
        };
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
        
        const estudiante = await siaService.updateEstudianteParcial(id, estudianteData);
        return {
          success: true,
          message: "Estudiante actualizado exitosamente",
          estudiante: estudiante,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: `Error al actualizar estudiante parcialmente: ${error.message}`,
          estudiante: null,
          errors: [error.message]
        };
      }
    },

    /**
     * Eliminar estudiante
     */
    eliminarEstudiante: async (_, { id }) => {
      try {
        const result = await siaService.deleteEstudiante(id);
        return {
          success: true,
          message: "Estudiante eliminado exitosamente",
          estudiante: null,
          errors: []
        };
      } catch (error) {
        return {
          success: false,
          message: `Error al eliminar estudiante: ${error.message}`,
          estudiante: null,
          errors: [error.message]
        };
      }
    }
  },

  // =============== RESOLVERS DE RELACIONES ===============

  /**
   * Resolver para obtener estudiantes de un curso (optimizado)
   */
  Curso: {
    estudiantes: async (parent) => {
      try {
        // Si el curso ya tiene estudiantes cargados (con CursoDetailSerializer)
        if (parent.estudiantes && Array.isArray(parent.estudiantes)) {
          return parent.estudiantes;
        }
        
        // Fallback: usar DataLoader si no están cargados
        return await siaService.cursoEstudiantesLoader.load(parent.id);
      } catch (error) {
        // Si hay error, retornar array vacío en lugar de fallar
        console.warn(`Error al obtener estudiantes del curso ${parent.id}: ${error.message}`);
        return [];
      }
    }
  },

  /**
   * Resolver para obtener el curso de un estudiante (optimizado con DataLoader)
   */
  Estudiante: {
    curso: async (parent) => {
      try {
        // Si no hay curso asignado, retornar null
        if (!parent.curso) {
          return null;
        }
        
        // Con select_related, el curso ya viene como objeto completo desde Django
        if (parent.curso && typeof parent.curso === 'object' && parent.curso.id) {
          return parent.curso;
        }
        
        // Fallback: si solo tenemos el ID del curso, usar DataLoader
        if (parent.curso && typeof parent.curso === 'number') {
          return await siaService.cursoLoader.load(parent.curso);
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