import Handlebars from 'handlebars';
import { signInPageTemplate } from './sign-in-page.tmpl';
import { Routes } from '../../constants/routes';
import { Block } from '../../lib/Block/Block';
import { Button, IButtonProps } from '../../components/button/button';
import { ILinkProps, Link } from '../../components/link/link';
import { IInputProps, Input } from '../../components/input/input';

const registerLink = `/${Routes.REGISTER}`;

interface ISignInPageProps {
  signInButton: Button;
  linkToRegister: Link;
  loginInput: Input;
  passwordInput: Input;
}

const template = Handlebars.compile(signInPageTemplate);

export class SignInPage extends Block<ISignInPageProps> {
  constructor(rootId: string) {
    const appSignInButtonProps: IButtonProps = {
      mode: 'primary',
      text: 'Войти',
      submit: true,
    };
    const linkToRegisterProps: ILinkProps = {
      mode: 'secondary',
      text: 'Зарегистрироваться',
      href: registerLink,
    };
    const loginInputProps: IInputProps = {
      name: 'login',
      label: 'Логин',
    };
    const passwordInputProps: IInputProps = {
      name: 'Password',
      label: 'Пароль',
      type: 'password',
    };

    super(
      'div',
      {
        signInButton: new Button(appSignInButtonProps),
        linkToRegister: new Link(linkToRegisterProps),
        loginInput: new Input(loginInputProps),
        passwordInput: new Input(passwordInputProps),
      },
      rootId,
    );
  }

  render(): string {
    const {
      signInButton, linkToRegister, loginInput, passwordInput,
    } = this.props;
    return template({
      appSignInButton: signInButton.render(),
      appLinkToRegister: linkToRegister.render(),
      appLoginInput: loginInput.render(),
      appPasswordInput: passwordInput.render(),
    });
  }
}
