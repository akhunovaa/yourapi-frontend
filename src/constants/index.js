export const API_BASE_URL = process.env.PUBLIC_URL;
export const ACCESS_TOKEN = 'accessToken';
export const OAUTH2_REDIRECT_URI = API_BASE_URL + '/oauth2/redirect';
export const GOOGLE_AUTH_URL = API_BASE_URL + '/auth/oauth2/authorize/google?redirect_uri=' + OAUTH2_REDIRECT_URI;
export const FACEBOOK_AUTH_URL = API_BASE_URL + '/auth/oauth2/authorize/facebook?redirect_uri=' + OAUTH2_REDIRECT_URI;
