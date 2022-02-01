import Handlebars from 'handlebars';
import { signInPageTemplate } from './sign-in-page.tmpl';
import { Routes } from '../../constants/routes';
import { Block } from '../../lib/Block/Block';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import { Input } from '../../components/input/input';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

const registerLink = `/${Routes.REGISTER}`;

interface IChildren {
  appLoginInput: Input;
  appPasswordInput: Input;
  appSignInButton: Button;
  appLinkToRegister: Link;
}

interface ISignInPageProps extends IComponentProps {
  children: IChildren;
}

const template = Handlebars.compile(signInPageTemplate);

export class SignInPage extends Block<ISignInPageProps> {
  constructor(rootId: string) {
    super(
      'div',
      {
        children: getChildren(),
      },
      rootId,
    );
  }

  render(): string {
    return template({});
  }
}

function getChildren(): IChildren {
  return {
    appLoginInput: new Input({
      name: 'login',
      label: 'Логин',
      mode: 'default',
    }),
    appPasswordInput: new Input({
      name: 'Password',
      label: 'Пароль',
      type: 'password',
    }),
    appSignInButton: new Button({
      mode: 'primary',
      text: 'Войти',
      submit: true,
    }),
    appLinkToRegister: new Link({
      mode: 'secondary',
      text: 'Зарегистрироваться',
      href: registerLink,
    }),
  };
}
