import Handlebars from 'handlebars';
import { signInPageTemplate } from './sign-in-page.tmpl';
import { InputProps } from '../../view-components/input';
import { Routes } from '../../constants/routes';

const fields: InputProps[] = [
  {
    name: 'login',
    label: 'Логин',
  },
  {
    name: 'password',
    label: 'Пароль',
    isPassword: true,
    error: 'Неправильный пароль',
    mode: 'error',
  },
];
const registerLink = `/${Routes.REGISTER}`;

export function signInPage() {
  const template = Handlebars.compile(signInPageTemplate);
  return Promise.resolve(
    template({
      fields,
      registerLink,
    }),
  );
}
