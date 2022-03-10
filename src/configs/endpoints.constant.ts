const AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth';
const USERS_ENDPOINT = 'https://ya-praktikum.tech/api/v2/user';

export const AuthEndpoint = {
  INDEX: AUTH_ENDPOINT,
  REGISTER: `${AUTH_ENDPOINT}/signup/`,
  SIGN_IN: `${AUTH_ENDPOINT}/signin/`,
  USER: `${AUTH_ENDPOINT}/user/`,
  LOGOUT: `${AUTH_ENDPOINT}/logout/`,
};

export const UsersEndpoint = {
  INDEX: USERS_ENDPOINT,
  UPDATE_AVATAR: `${USERS_ENDPOINT}/profile/`,
  CHANGE_PASSWORD: `${USERS_ENDPOINT}/password/`,
  USER: `${USERS_ENDPOINT}/user/`,
  SEARCH: `${USERS_ENDPOINT}/search/`,
};