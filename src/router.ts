import { Routes } from './constants/routes';
import { acoountPage } from './pages/account-page';
import { changePasswordPage } from './pages/change-password-page';
import { chatPage } from './pages/chat-page';
import { editAcoountPage } from './pages/edit-account-page';
import { navigationPage } from './pages/navigation-page';
import { registerPage } from './pages/register-page';
import { signInPage } from './pages/sign-in-page';
import { notFoundPage } from './pages/404-page';
import { internalErrorPage } from './pages/500-page';

export function resolvePageByRoute(url?: string): Promise<string> {
  switch (url) {
    case Routes.CHATS:
      return chatPage();
    case Routes.SIGN_IN:
      return signInPage();
    case Routes.REGISTER:
      return registerPage();
    case Routes.ACCOUNT:
      return acoountPage();
    case Routes.EDIT_ACCOUNT:
      return editAcoountPage();
    case Routes.CHANGE_PASSWORD:
      return changePasswordPage();
    case Routes.NOT_FOUND:
      return notFoundPage();
    case Routes.INTERNAL_ERROR:
      return internalErrorPage();
    default:
      return navigationPage();
  }
}
