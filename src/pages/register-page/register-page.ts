import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { Routes } from '../../constants/routes';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { registerPageTemplate } from './register-page.tmpl';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import {
  email,
  login,
  maxLength,
  minLength,
  name,
  notOnlyNumbers,
  password,
  phone,
  validationMessage,
} from '../../presentation-logic/forms/validate-input';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../lib/models/page.interface';
import { INewUser } from '../../lib/interfaces/new-user.interface';
import { registerNewUser } from '../../business-logic/auth/register-new-user';
import { saveUserToStore } from '../../business-logic/auth/save-user-to-store';

interface IChildren {
  appInputEmail: Input;
  appInputLogin: Input;
  appInputFirstName: Input;
  appInputSecondName: Input;
  appInputDisplayName: Input;
  appInputPhone: Input;
  appInputPassword: Input;
  appInputPasswordRepeat: Input;
  appLinkToSignIn: Link;
  appButtonRegister: Button;
}

export interface IRegisterPageProps extends IComponentProps {
  children?: IChildren;
  fieldsValue?: INewUser;
  validationMessage?: string;
}

const signInLink = `..${Routes.SIGN_IN}`;
const formId = `i${v4()}`;
const formSelector = `#${formId}`;
const template = Handlebars.compile(registerPageTemplate);

export class RegisterPage extends Block<IRegisterPageProps> {
  private _email: string = '';

  private _login: string = '';

  private _firstName: string = '';

  private _secondName: string = '';

  private _displayName: string = '';

  private _phone: string = '';

  private _password: string = '';

  private _passwordRepeat: string = '';

  private _childrenComponents: IChildren = {
    appInputEmail: new Input({
      name: 'email',
      label: 'Почта',
      value: this.props.fieldsValue?.email,
      validationFns: [email()],
      internalEvents: {
        input: {
          blur: () => this._handleEmailChange(),
        },
      },
    }),
    appInputLogin: new Input({
      name: 'login',
      label: 'Логин',
      value: this.props.fieldsValue?.login,
      validationFns: [minLength(3), maxLength(20), notOnlyNumbers(), login()],
      internalEvents: {
        input: {
          blur: () => this._handleLoginChange(),
        },
      },
    }),
    appInputFirstName: new Input({
      name: 'first_name',
      label: 'Имя',
      value: this.props.fieldsValue?.firstName,
      validationFns: [name()],
      internalEvents: {
        input: {
          blur: () => this._handleFirstNameChange(),
        },
      },
    }),
    appInputSecondName: new Input({
      name: 'second_name',
      label: 'Фамилия',
      value: this.props.fieldsValue?.secondName,
      validationFns: [name()],
      internalEvents: {
        input: {
          blur: () => this._handleSecondNameChange(),
        },
      },
    }),
    appInputDisplayName: new Input({
      name: 'display_name',
      label: 'Имя в чате',
      value: this.props.fieldsValue?.displayName,
      internalEvents: {
        input: {
          blur: () => this._handleDisplayNameChange(),
        },
      },
    }),
    appInputPhone: new Input({
      name: 'phone',
      label: 'Телефон',
      value: this.props.fieldsValue?.phone,
      validationFns: [minLength(10), maxLength(15), phone()],
      internalEvents: {
        input: {
          blur: () => this._handlePhoneChange(),
        },
      },
    }),
    appInputPassword: new Input({
      name: 'password',
      label: 'Пароль',
      type: 'password',
      value: this.props.fieldsValue?.password,
      validationFns: [minLength(8), maxLength(40), password()],
      internalEvents: {
        input: {
          blur: () => this._handlePasswordChange(),
        },
      },
    }),
    appInputPasswordRepeat: new Input({
      name: 'password-repeat',
      label: 'Повтор пароля',
      type: 'password',
      value: this.props.fieldsValue?.password,
      internalEvents: {
        input: {
          blur: () => this._handlePasswordRepeatChange(),
        },
      },
    }),
    appLinkToSignIn: new Link({
      mode: 'secondary',
      text: 'Войти',
      href: signInLink,
    }),
    appButtonRegister: new Button({
      mode: 'primary',
      text: 'Зарегистрироваться',
      submit: true,
    }),
  };

  constructor({ rootId, props }: IPageConstructorParams<IRegisterPageProps>) {
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
    document.title = getDocumentTitle('Регистрация');
  }

  render(): string {
    return template({
      formId,
      validationMessage: this.props.validationMessage,
    });
  }

  private _handleEmailChange(): void {
    this._email = this._childrenComponents.appInputEmail.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputEmail.validate();
    this._childrenComponents.appInputEmail.setProps({
      value: this._email,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputEmail.setValidState(isValid);
  }

  private _handleLoginChange(): void {
    this._login = this._childrenComponents.appInputLogin.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputLogin.validate();
    this._childrenComponents.appInputLogin.setProps({
      value: this._login,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputLogin.setValidState(isValid);
  }

  private _handleFirstNameChange(): void {
    this._firstName = this._childrenComponents.appInputFirstName.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputFirstName.validate();
    this._childrenComponents.appInputFirstName.setProps({
      value: this._firstName,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputFirstName.setValidState(isValid);
  }

  private _handleSecondNameChange(): void {
    this._secondName = this._childrenComponents.appInputSecondName.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputSecondName.validate();
    this._childrenComponents.appInputSecondName.setProps({
      value: this._secondName,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputSecondName.setValidState(isValid);
  }

  private _handleDisplayNameChange(): void {
    this._displayName = this._childrenComponents.appInputSecondName.getValue();
    this._childrenComponents.appInputSecondName.setProps({
      value: this._displayName,
    });
  }

  private _handlePhoneChange(): void {
    this._phone = this._childrenComponents.appInputPhone.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputPhone.validate();
    this._childrenComponents.appInputPhone.setProps({
      value: this._phone,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputPhone.setValidState(isValid);
  }

  private _handlePasswordChange(): void {
    this._password = this._childrenComponents.appInputPassword.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputPassword.validate();
    this._childrenComponents.appInputPassword.setProps({
      value: this._password,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputPassword.setValidState(isValid);
  }

  private _handlePasswordRepeatChange(): void {
    this._passwordRepeat =
      this._childrenComponents.appInputPasswordRepeat.getValue();
    const isValid = this._password === this._passwordRepeat;
    const errorMessage = isValid
      ? undefined
      : [validationMessage.passwordRepeated];
    this._childrenComponents.appInputPasswordRepeat.setProps({
      value: this._passwordRepeat,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputPasswordRepeat.setValidState(isValid);
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._handleEmailChange();
    this._handleLoginChange();
    this._handleFirstNameChange();
    this._handleSecondNameChange();
    this._handleDisplayNameChange();
    this._handlePhoneChange();
    this._handlePasswordChange();
    this._handlePasswordRepeatChange();
    const formData = getFormData(e.target as HTMLFormElement);
    const newUser = convertFormToNewUser(formData);
    registerNewUser(newUser).then((res) => {
      if (res.isSuccess) {
        saveUserToStore(res.payload);
      } else {
        let message = validationMessage.unidentifiedError;
        if (typeof res.payload === 'string') {
          message = res.payload;
        }
        if (res.payload instanceof Error) {
          message = res.payload.message;
        }
        this.setProps({ validationMessage: message });
      }
    });
  }
}

function convertFormToNewUser(
  formData: Record<string, FormDataEntryValue>,
): INewUser {
  return {
    email: formData.email as string,
    firstName: formData.first_name as string,
    secondName: formData.second_name as string,
    displayName: formData.display_name as string,
    login: formData.login as string,
    password: formData.password as string,
    phone: formData.phone as Phone,
  };
}
