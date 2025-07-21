const { gql } = require('apollo-server-express');

const subjectTypes = gql`
  # =============== TIPOS DE ASIGNATURAS (Component-2-1) ===============
  
  type Asignatura {
    id: ID!
    nombre: String!
    profesorIds: [ID!]!
    
    # =============== RELACIONES CON OTROS MICROSERVICIOS ===============
    # Lista de profesores asignados (viene de Component-2-1: Profesores)
    profesores: [Profesor!]!
    
    # Lista de calificaciones de esta asignatura (viene de Component-2-2: Calificaciones)
    calificaciones: [Calificacion!]!
  }

  extend type Query {
    # =============== QUERIES DE ASIGNATURAS ===============
    # Obtener todas las asignaturas
    asignaturas: [Asignatura!]!
    
    # Obtener asignatura por ID
    asignaturaPorId(id: ID!): Asignatura
  }

  extend type Mutation {
    # =============== MUTATIONS DE ASIGNATURAS ===============
    # Crear nueva asignatura
    crearAsignatura(nombre: String!): Asignatura!
    
    # Actualizar asignatura existente
    actualizarAsignatura(id: ID!, nombre: String): Asignatura!
    
    # Eliminar asignatura
    eliminarAsignatura(id: ID!): Boolean!
    
    # Asignar profesor a asignatura
    asignarProfesorAAsignatura(profesorId: ID!, asignaturaId: ID!): Asignatura!
    
    # Desasignar profesor de asignatura
    desasignarProfesorDeAsignatura(profesorId: ID!, asignaturaId: ID!): Asignatura!
  }
`;

module.exports = subjectTypes;