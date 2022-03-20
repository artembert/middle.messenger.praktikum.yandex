import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { signInPageTemplate } from './sign-in-page.tmpl';
import { Routes } from '../../constants/routes';
import { Block } from '../../lib/block/block';
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
  validationMessage,
} from '../../presentation-logic/forms/validate-input';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { signIn } from '../../business-logic/auth/sign-in';
import { ICredentials } from '../../lib/interfaces/credentials.interface';
import { Router } from '../../lib/router/router';
import { inAppNavigation } from '../../lib/router/in-app-navigation';

interface IChildren {
  appLoginInput: Input;
  appPasswordInput: Input;
  appSignInButton: Button;
  appLinkToRegister: Link;
}

export interface ISignInPageProps extends IComponentProps {
  children?: IChildren;
  validationMessage?: string;
}

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
      name: 'password',
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
      href: `..${Routes.REGISTER}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.REGISTER),
      },
    }),
  };

  constructor(props: ISignInPageProps, rootId: string) {
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
    return template({
      formId,
      validationMessage: this.props.validationMessage,
    });
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
    const credentials = convertFormToCredentials(formData);
    signIn(credentials).then((res) => {
      if (res.isSuccess) {
        const router = new Router();
        router.go(Routes.CHATS);
      } else {
        let message = validationMessage.unidentifiedError;
        if (typeof res.payload === 'string') {
          message = res.payload;
        }
        this.setProps({ validationMessage: message });
      }
    });
  }
}

function convertFormToCredentials(
  formData: Record<string, FormDataEntryValue>,
): ICredentials {
  return {
    login: formData.login as string,
    password: formData.password as string,
  };
}
