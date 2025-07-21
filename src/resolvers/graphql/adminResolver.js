const siaService = require('../../services/siaService');
const subjectService = require('../../services/subjectService');
const professorService = require('../../services/professorService.js');

const adminResolver = {
  Query: {
    gradosGestion: async (_, { page = 1 }) => {
      // 1. Obtener cursos paginados con estudiantes embebidos
      const cursosRes = await siaService.getCursosWithEstudiantes(page);
      const cursos = cursosRes.cursos || [];

      // 2. Obtener asignaturas y profesores (si quieres mostrar globales)
      const asignaturas = await subjectService.getAsignaturas();
      const profesores = await professorService.getProfesores();
      // Imprimir asignaturas y profesores en consola para depuración
      console.log("AAAAAAsignaturas:", asignaturas);
      console.log("PPPPPPPPProfesores:", profesores);
      // 3. Mapear la estructura
      const results = cursos.map(curso => ({
        id: curso.id,
        nombre: curso.nombre,
        estudiantes: curso.estudiantes || [],
        asignaturas: [] // O asignaturas globales si no hay relación
      }));

      return {
        next: cursosRes.next,
        results
      };
    }
  }
};

module.exports = adminResolver; 