const { gql } = require('apollo-server-express');

const siaTypes = gql`
  # Tipo para representar un Curso
  type Curso {
    id: ID!
    nombre: String!
    codigo: String!
    estudiantes: [Estudiante!]!
  }

  # Tipo para representar un Estudiante
  type Estudiante {
    id: ID!
    nombreCompleto: String!
    documento: String!
    fechaNacimiento: String!
    acudiente: String!
    curso: Curso!
    fechaRegistro: String!
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
    # === QUERIES DE CURSOS ===
    # Obtener todos los cursos con filtros opcionales
    cursos(search: String, ordering: String, page: Int): CursosPaginados!
    
    # Obtener un curso por ID
    curso(id: ID!): Curso
    
    # Obtener estudiantes de un curso específico
    cursoEstudiantes(id: ID!): [Estudiante!]!

    # === QUERIES DE ESTUDIANTES ===
    # Obtener todos los estudiantes con filtros opcionales
    estudiantes(search: String, ordering: String, page: Int): EstudiantesPaginados!
    
    # Obtener un estudiante por ID
    estudiante(id: ID!): Estudiante
    
    # Obtener estudiantes por código de curso
    estudiantesPorCurso(codigo: String!): [Estudiante!]!
  }

  # Extender Mutation con operaciones SIA
  extend type Mutation {
    # === MUTATIONS DE CURSOS ===
    # Crear nuevo curso
    crearCurso(input: CursoInput!): Curso!
    
    # Actualizar curso completamente
    actualizarCurso(id: ID!, input: CursoInput!): Curso!
    
    # Actualizar curso parcialmente
    actualizarCursoParcial(id: ID!, nombre: String, codigo: String): Curso!
    
    # Eliminar curso
    eliminarCurso(id: ID!): Boolean!

    # === MUTATIONS DE ESTUDIANTES ===
    # Crear nuevo estudiante
    crearEstudiante(input: EstudianteInput!): Estudiante!
    
    # Actualizar estudiante completamente
    actualizarEstudiante(id: ID!, input: EstudianteInput!): Estudiante!
    
    # Actualizar estudiante parcialmente
    actualizarEstudianteParcial(
      id: ID!, 
      nombreCompleto: String, 
      documento: String, 
      fechaNacimiento: String, 
      acudiente: String, 
      curso: ID
    ): Estudiante!
    
    # Eliminar estudiante
    eliminarEstudiante(id: ID!): Boolean!
  }
`;

module.exports = siaTypes; 