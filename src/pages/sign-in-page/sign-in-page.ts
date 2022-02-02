import Handlebars from 'handlebars';
import { signInPageTemplate } from './sign-in-page.tmpl';
import { Routes } from '../../constants/routes';
import { Block } from '../../lib/Block/Block';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import { Input } from '../../components/input/input';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import {
  alphabet,
  maxLength,
  minLength,
  notOnlyNumbers,
  password,
} from '../../presentation-logic/forms/validate-input';

const registerLink = `/${Routes.REGISTER}`;

interface IChildren {
  appLoginInput: Input;
  appPasswordInput: Input;
  appSignInButton: Button;
  appLinkToRegister: Link;
}

interface ISignInPageProps extends IComponentProps {
  children?: IChildren;
}

const template = Handlebars.compile(signInPageTemplate);

export class SignInPage extends Block<ISignInPageProps> {
  private _loginValue: string = '';

  private _passwordValue: string = '';

  private _childrenComponents: IChildren = {
    appLoginInput: new Input({
      name: 'login',
      label: 'Логин',
      mode: 'default',
      validationFns: [
        minLength(3),
        maxLength(20),
        alphabet(),
        notOnlyNumbers(),
      ],
      internalEvents: {
        input: {
          blur: (e: FocusEvent) => this._handleInput(e),
        },
      },
    }),
    appPasswordInput: new Input({
      name: 'Password',
      label: 'Пароль',
      type: 'password',
      validationFns: [minLength(8), maxLength(40), password()],
      internalEvents: {
        input: {
          blur: (e: FocusEvent) => this._handlePasswordChange(e),
        },
      },
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

  constructor(rootId: string) {
    super('div', {}, rootId);
    this.setProps({
      children: this._childrenComponents,
    });
  }

  render(): string {
    return template({});
  }

  private _handleInput(e: FocusEvent): void {
    this._loginValue = (e.currentTarget as HTMLInputElement).value;
    const { isValid, errorMessage } = this._childrenComponents.appLoginInput.validate();
    this._childrenComponents.appLoginInput.setProps({
      value: this._loginValue,
      error: errorMessage ?? '',
      mode: isValid ? 'default' : 'error',
    });
  }

  private _handlePasswordChange(e: FocusEvent): void {
    this._passwordValue = (e.currentTarget as HTMLInputElement).value;
    const { isValid, errorMessage } = this._childrenComponents.appPasswordInput.validate();
    this._childrenComponents.appPasswordInput.setProps({
      value: this._passwordValue,
      error: errorMessage ?? '',
      mode: isValid ? 'default' : 'error',
    });
  }
}
