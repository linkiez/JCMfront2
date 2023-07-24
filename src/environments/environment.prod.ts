export const environment = {
  production: true,
  backendURL: location.protocol === 'https' ? 'https://linkiez.ddns.net:2487/' : 'http://linkiez.ddns.net:2486/',
  accessTokenExpirein: 480 /*in minutes*/,
  refreshTokenExpireIn: 5 /*in days*/
};


