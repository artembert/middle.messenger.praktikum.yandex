import './styles/index';
import { Router } from './lib/router';
import { Routes } from './constants/routes';
import {
  AccountPage,
  ChangeAvatarPage,
  ChangePasswordPage,
  ChatPage,
  EditAccountPage,
  LoadingPage,
  NavigationPage,
  NotFoundErrorPage,
  RegisterPage,
  SignInPage,
  InternalErrorPage,
} from './pages';

const ROOT_ELEMENT_ID = 'root';

const rootElement = document.getElementById(ROOT_ELEMENT_ID);
if (!rootElement) {
  throw new Error(`Root element #${rootElement} is not found`);
}

const router = new Router(ROOT_ELEMENT_ID);

router
  .use(Routes.SIGN_IN, SignInPage)
  .use(Routes.REGISTER, RegisterPage)
  .use(Routes.NOT_FOUND, NotFoundErrorPage)
  .use(Routes.INTERNAL_ERROR, InternalErrorPage)
  .use(Routes.CHATS, ChatPage, true)
  .use(Routes.ACCOUNT, AccountPage, true)
  .use(Routes.EDIT_ACCOUNT, EditAccountPage, true)
  .use(Routes.CHANGE_PASSWORD, ChangePasswordPage, true)
  .use(Routes.CHANGE_AVATAR, ChangeAvatarPage, true)
  .use(Routes.INDEX, NavigationPage)
  .setLoader(LoadingPage)
  .start();
