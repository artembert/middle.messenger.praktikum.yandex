const AUTH_ENDPOINT = 'https://ya-praktikum.tech/api/v2/auth';
const USERS_ENDPOINT = 'https://ya-praktikum.tech/api/v2/user';
const CHATS_ENDPOINT = 'https://ya-praktikum.tech/api/v2/chats';
export const RESOURCES_ENDPOINT = 'https://ya-praktikum.tech/api/v2/resources';
const CHATS_SOCKET_ENDPOINT = 'wss://ya-praktikum.tech/ws/chats';

export const AuthEndpoint = {
  INDEX: AUTH_ENDPOINT,
  REGISTER: `${AUTH_ENDPOINT}/signup/`,
  SIGN_IN: `${AUTH_ENDPOINT}/signin/`,
  USER: `${AUTH_ENDPOINT}/user/`,
  LOGOUT: `${AUTH_ENDPOINT}/logout/`,
};

export const UsersEndpoint = {
  INDEX: USERS_ENDPOINT,
  UPDATE_INFO: `${USERS_ENDPOINT}/profile/`,
  UPDATE_AVATAR: `${USERS_ENDPOINT}/profile/avatar`,
  CHANGE_PASSWORD: `${USERS_ENDPOINT}/password/`,
  USER: `${USERS_ENDPOINT}/user/`,
  SEARCH: `${USERS_ENDPOINT}/search/`,
};

export const ChatsEndpoint = {
  INDEX: CHATS_ENDPOINT,
  USERS: `${CHATS_ENDPOINT}/users/`,
  TOKEN: (chatId: number) => `${CHATS_ENDPOINT}/token/${chatId}`,
  WEB_SOCKET: ({
    userId,
    chatId,
    token,
  }: {
    userId: number;
    chatId: number;
    token: string;
  }) => `${CHATS_SOCKET_ENDPOINT}/${userId}/${chatId}/${token}`,
};
