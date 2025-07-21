const { gql } = require('apollo-server-express');

const professorTypes = gql`
  # =============== TIPOS DE PROFESORES (Component-2-1) ===============
  
  type Profesor {
    id: ID!
    nombre: String!
    documento: String!
    area: String!
    
    # =============== RELACIONES CON OTROS MICROSERVICIOS ===============
    # Lista de asignaturas que imparte (viene de Component-2-1: Asignaturas)
    asignaturas: [Asignatura!]!
  }

  extend type Query {
    # =============== QUERIES DE PROFESORES ===============
    # Obtener todos los profesores
    profesores: [Profesor!]!
    
    # Obtener profesor por ID
    profesorPorId(id: ID!): Profesor
  }

  extend type Mutation {
    # =============== MUTATIONS DE PROFESORES ===============
    # Crear nuevo profesor
    crearProfesor(nombre: String!, documento: String!, area: String!): Profesor!
    
    # Actualizar profesor
    actualizarProfesor(id: ID!, nombre: String, area: String): Profesor!
    
    # Eliminar profesor
    eliminarProfesor(id: ID!): Boolean!
  }
`;

module.exports = professorTypes;