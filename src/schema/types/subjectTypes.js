const { gql } = require('apollo-server-express');

const subjectTypes = gql`
  type Asignatura {
    id: ID!
    nombre: String!
    profesorIds: [ID!]!
  }

  extend type Query {
    asignaturas: [Asignatura!]!
    asignaturaPorId(id: ID!): Asignatura
  }

  extend type Mutation {
    # Crear nueva asignatura
    crearAsignatura(nombre: String!): Asignatura
    
    # Actualizar asignatura existente
    actualizarAsignatura(id: ID!, nombre: String): Asignatura
    
    # Eliminar asignatura
    eliminarAsignatura(id: ID!): Boolean
    
    # Asignar profesor a asignatura
    asignarProfesorAAsignatura(profesorId: ID!, asignaturaId: ID!): Asignatura
    
    # Desasignar profesor de asignatura
    desasignarProfesorDeAsignatura(profesorId: ID!, asignaturaId: ID!): Asignatura
  }
`;

module.exports = subjectTypes;