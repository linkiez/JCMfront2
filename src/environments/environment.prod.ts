export const environment = {
  production: true,
  backendURL: process.env["BACKEND_URL"] || 'http://localhost:3000/',
  accessTokenExpirein: 480 /*in minutes*/,
  refreshTokenExpireIn: 5 /*in days*/
};


