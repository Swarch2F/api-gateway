module.exports = {
  GX_BE_PROASIG_URL: process.env.GX_BE_PROASIG_URL || 'http://localhost:8080/graphql',
  GX_BE_CALIF_URL: process.env.GX_BE_CALIF_URL || 'http://localhost:8081/graphql',
  GX_AUTH_URL: process.env.GX_AUTH_URL || 'http://localhost:8082/api/v1',
  GX_SIA_URL: process.env.GX_SIA_URL || 'http://localhost:8000/api/v1',
  PORT: process.env.PORT || 4000
};