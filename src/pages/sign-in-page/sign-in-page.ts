import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { signInPageTemplate } from './sign-in-page.tmpl';
import { Routes } from '../../constants/routes';
import { Block } from '../../lib/Block/Block';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import { Input } from '../../components/input/input';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import {
  login,
  maxLength,
  minLength,
  notOnlyNumbers,
  password,
} from '../../presentation-logic/forms/validate-input';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../lib/models/page.interface';

interface IChildren {
  appLoginInput: Input;
  appPasswordInput: Input;
  appSignInButton: Button;
  appLinkToRegister: Link;
}

interface ISignInPageProps extends IComponentProps {
  children?: IChildren;
}

const registerLink = `..${Routes.REGISTER}`;
const formId = `i${v4()}`;
const formSelector = `#${formId}`;
const template = Handlebars.compile(signInPageTemplate);

export class SignInPage extends Block<ISignInPageProps> {
  private _loginValue: string = '';

  private _passwordValue: string = '';

  private _childrenComponents: IChildren = {
    appLoginInput: new Input({
      name: 'login',
      label: 'Логин',
      mode: 'default',
      validationFns: [minLength(3), maxLength(20), login(), notOnlyNumbers()],
      internalEvents: {
        input: {
          blur: () => this._handleLoginChange(),
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
          blur: () => this._handlePasswordChange(),
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

  constructor({ rootId, props }: IPageConstructorParams<ISignInPageProps>) {
    super('div', props, rootId);
    this.setProps({
      children: this._childrenComponents,
      internalEvents: {
        [formSelector]: {
          submit: (e: SubmitEvent) => this._handleFormSubmit(e),
        },
      },
    });
  }

  override componentDidMount() {
    super.componentDidMount();
    document.title = getDocumentTitle('Вход');
  }

  render(): string {
    return template({ formId });
  }

  private _handleLoginChange(): void {
    this._loginValue = this._childrenComponents.appLoginInput.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appLoginInput.validate();
    this._childrenComponents.appLoginInput.setProps({
      value: this._loginValue,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appLoginInput.setValidState(isValid);
  }

  private _handlePasswordChange(): void {
    this._passwordValue = this._childrenComponents.appPasswordInput.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appPasswordInput.validate();
    this._childrenComponents.appPasswordInput.setProps({
      value: this._passwordValue,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appPasswordInput.setValidState(isValid);
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._handleLoginChange();
    this._handlePasswordChange();
    const formData = getFormData(e.target as HTMLFormElement);
    console.log('Sign in form', formData);
  }
}
