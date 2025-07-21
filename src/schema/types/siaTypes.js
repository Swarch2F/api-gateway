const { gql } = require('apollo-server-express');

const siaTypes = gql`
  # =============== TIPOS DE SIA (Component-1) ===============
  
  # Tipo para representar un Curso
  type Curso {
    id: ID!
    nombre: String!
    codigo: String!
    
    # =============== RELACIONES CON OTROS MICROSERVICIOS ===============
    # Lista de estudiantes del curso (viene de Component-1: SIA)
    estudiantes: [Estudiante!]!
    
    # Lista de calificaciones del curso (viene de Component-2-2: Calificaciones)
    calificaciones: [Calificacion!]!
  }

  # Tipo para representar un Estudiante
  type Estudiante {
    id: ID!
    nombreCompleto: String!
    documento: String!
    fechaNacimiento: String!
    acudiente: String!
    fechaRegistro: String!
    
    # =============== RELACIONES CON OTROS MICROSERVICIOS ===============
    # Datos del curso (viene de Component-1: SIA)
    # NOTA: Con select_related, esto viene como objeto completo, no solo ID
    # Puede ser null si el estudiante no tiene curso asignado
    curso: Curso
    
    # Lista de calificaciones del estudiante (viene de Component-2-2: Calificaciones)
    calificaciones: [Calificacion!]!
  }

  # Input types para crear/actualizar
  input CursoInput {
    nombre: String!
    codigo: String!
  }

  input EstudianteInput {
    nombreCompleto: String!
    documento: String!
    fechaNacimiento: String!
    acudiente: String!
    curso: ID!
  }

  # Tipos de respuesta para operaciones SIA
  type CursoResponse {
    success: Boolean!
    message: String
    curso: Curso
    errors: [String!]
  }

  type EstudianteResponse {
    success: Boolean!
    message: String
    estudiante: Estudiante
    errors: [String!]
  }

  # Tipo para respuestas paginadas
  type CursosPaginados {
    count: Int!
    next: String
    previous: String
    results: [Curso!]!
  }

  type EstudiantesPaginados {
    count: Int!
    next: String
    previous: String
    results: [Estudiante!]!
  }

  # Extender Query con operaciones SIA
  extend type Query {
    # =============== QUERIES DE CURSOS ===============
    # Obtener todos los cursos con filtros opcionales
    cursos(search: String, ordering: String, page: Int): CursosPaginados!
    
    # Obtener un curso por ID
    curso(id: ID!): Curso
    
    # Obtener estudiantes de un curso específico
    cursoEstudiantes(id: ID!): [Estudiante!]!

    # =============== QUERIES DE ESTUDIANTES ===============
    # Obtener todos los estudiantes con filtros opcionales
    estudiantes(search: String, ordering: String, page: Int): EstudiantesPaginados!
    
    # Obtener un estudiante por ID
    estudiante(id: ID!): Estudiante
    
    # Obtener estudiantes por código de curso
    estudiantesPorCurso(codigo: String!): [Estudiante!]!

    gradosGestion(page: Int): GradosGestionPaginado!
  }

  type GradosGestionPaginado {
    next: Int
    results: [GradoGestion!]!
  }

  type GradoGestion {
    id: ID!
    nombre: String!
    estudiantes: [Estudiante!]!
    asignaturas: [AsignaturaConProfesores!]!
  }

  type AsignaturaConProfesores {
    id: ID!
    nombre: String!
    profesores: [Profesor!]!
  }

  # Extender Mutation con operaciones SIA
  extend type Mutation {
    # =============== MUTATIONS DE CURSOS ===============
    # Crear nuevo curso
    crearCurso(input: CursoInput!): CursoResponse!
    
    # Actualizar curso completamente
    actualizarCurso(id: ID!, input: CursoInput!): CursoResponse!
    
    # Actualizar curso parcialmente
    actualizarCursoParcial(id: ID!, nombre: String, codigo: String): CursoResponse!
    
    # Eliminar curso
    eliminarCurso(id: ID!): CursoResponse!

    # =============== MUTATIONS DE ESTUDIANTES ===============
    # Crear nuevo estudiante
    crearEstudiante(input: EstudianteInput!): EstudianteResponse!
    
    # Actualizar estudiante completamente
    actualizarEstudiante(id: ID!, input: EstudianteInput!): EstudianteResponse!
    
    # Actualizar estudiante parcialmente
    actualizarEstudianteParcial(
      id: ID!, 
      nombreCompleto: String, 
      documento: String, 
      fechaNacimiento: String, 
      acudiente: String, 
      curso: ID
    ): EstudianteResponse!
    
    # Eliminar estudiante
    eliminarEstudiante(id: ID!): EstudianteResponse!
  }
`;

module.exports = siaTypes; 