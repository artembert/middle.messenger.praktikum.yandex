import './styles/index';
import { Router } from './lib/router/router';
import { Routes } from './constants/routes';
import { SignInPage } from './pages/sign-in-page/sign-in-page';
import { NotFoundErrorPage } from './pages/error-pages/not-found-error-page/not-found-error-page';
import { NavigationPage } from './pages/navigation-page/navigation-page';

const ROOT_ELEMENT_ID = 'root';

const rootElement = document.getElementById(ROOT_ELEMENT_ID);
if (!rootElement) {
  throw new Error(`Root element #${rootElement} is not found`);
}

const router = new Router(ROOT_ELEMENT_ID);

router
  .use(Routes.SIGN_IN, SignInPage)
  .use(Routes.NOT_FOUND, NotFoundErrorPage)
  .use(Routes.INDEX, NavigationPage)
  .start();
