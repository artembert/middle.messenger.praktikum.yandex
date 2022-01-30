import './styles/index';
import { Router } from './lib/router/router';
import { Routes } from './constants/routes';
import { SignInPage } from './pages/sign-in-page/sign-in-page';

const ROOT_ELEMENT_ID = 'root';

const rootElement = document.getElementById(ROOT_ELEMENT_ID);
if (!rootElement) {
  throw new Error(`Root element #${rootElement} is not found`);
}

const router = new Router(ROOT_ELEMENT_ID);

router.use(Routes.SIGN_IN, SignInPage).start();
