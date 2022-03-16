import './styles/index';
import { Router } from './lib/router/router';
import { Routes } from './constants/routes';
import SignInPage from './pages/sign-in-page';
import NotFoundErrorPage from './pages/error-pages/not-found-error-page';
import { NavigationPage } from './pages/navigation-page/navigation-page';
import InternalErrorPage from './pages/error-pages/internal-error-page';
import RegisterPage from './pages/register-page';
import ChatPage from './pages/chat-page';
import AccountPage from './pages/account-page';
import EditAccountPage from './pages/edit-account-page';
import ChangePasswordPage from './pages/change-password-page';
import LoadingPage from './pages/loading-page';
import { registerViewComponents } from './view-components';

const ROOT_ELEMENT_ID = 'root';

const rootElement = document.getElementById(ROOT_ELEMENT_ID);
if (!rootElement) {
  throw new Error(`Root element #${rootElement} is not found`);
}

registerViewComponents();

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
  .use(Routes.INDEX, NavigationPage)
  .setLoader(LoadingPage)
  .start();
