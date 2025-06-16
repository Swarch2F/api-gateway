const { gql } = require('apollo-server-express');

const authTypes = gql`
  # Tipos de datos para autenticación
  type User {
    id: ID!
    name: String!
    email: String!
    role: String!
  }

  type AuthStatusResponse {
    user: User!
    isAuthenticated: Boolean!
  }

  type LoginResponse {
    token: String!
    message: String!
  }
  
  type LogoutResponse {
    message: String!
  }

  type RegisterResponse {
    message: String
    error: String
  }

  type GoogleLoginResponse {
    googleUrl: String!
    message: String!
  }

  type LinkAccountResponse {
    message: String!
  }

  type UserProfile {
    message: String!
    user_id: String!
  }

  # Input types para las mutations
  input RegisterInput {
    email: String!
    password: String!
    name: String!
    role: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input LinkGoogleAccountInput {
    email: String!
    password: String!
    googleAuthCode: String!
  }

  # Extender Query existente
  extend type Query {
    # Obtener URL para login con Google
    getGoogleLoginUrl: GoogleLoginResponse!
    
    # Obtener perfil del usuario autenticado (requiere token en headers)
    userProfile: UserProfile!
    
    # Verificar estado de autenticación
    authStatus: AuthStatusResponse!
  }

  # Extender Mutation existente
  extend type Mutation {
    # Registro de usuario nativo
    registerUser(input: RegisterInput!): RegisterResponse!
    
    # Login de usuario nativo
    loginUser(input: LoginInput!): LoginResponse!
    
    # Vincular cuenta de Google a cuenta existente
    linkGoogleAccount(input: LinkGoogleAccountInput!): LinkAccountResponse!

    # Cerrar sesión del usuario
    logout: LogoutResponse!
  }
`;

module.exports = authTypes;