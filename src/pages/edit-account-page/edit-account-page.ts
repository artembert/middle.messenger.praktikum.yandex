import './edit-account-page.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { editAccountPageTemplate } from './edit-account-page.tmpl';
import { Routes } from '../../constants/routes';
import { Input } from '../../components/input/input';
import { Link } from '../../components/link/link';
import { Button } from '../../components/button/button';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { Block } from '../../lib/Block/Block';
import {
  email,
  login,
  maxLength,
  minLength,
  name,
  notOnlyNumbers,
  phone,
} from '../../presentation-logic/forms/validate-input';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { registerHelpers } from '../../lib';
import { registerAccountHeaderComponent } from '../../view-components/account-header';
import { registerAvatarComponent } from '../../view-components/avatar';

interface IChildren {
  appInputEmail: Input;
  appInputLogin: Input;
  appInputFirstName: Input;
  appInputSecondName: Input;
  appInputDisplayName: Input;
  appInputPhone: Input;
  appLinkToAccountPage: Link;
  appButtonSave: Button;
}

interface IRegisterPageProps extends IComponentProps {
  children?: IChildren;
}

const accountPageLink = `/${Routes.ACCOUNT}`;
const formId = `i${v4()}`;
const formSelector = `#${formId}`;

export class EditAccountPage extends Block<IRegisterPageProps> {
  private _email: string = 'user-eml-96@gmail.com';

  private _login: string = 'user-eml-96';

  private _firstName: string = 'Дмитрий';

  private _secondName: string = 'Федоров';

  private _displayName: string = 'Дмитрий Ф.';

  private _phone: string = '+79995280752';

  private _childrenComponents: IChildren = {
    appInputEmail: new Input({
      name: 'email',
      label: 'Почта',
      value: this._email,
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
      value: this._login,
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
      value: this._firstName,
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
      value: this._secondName,
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
      value: this._displayName,
      internalEvents: {
        input: {
          blur: () => this._handleDisplayNameChange(),
        },
      },
    }),
    appInputPhone: new Input({
      name: 'phone',
      label: 'Телефон',
      value: this._phone,
      validationFns: [minLength(10), maxLength(15), phone()],
      internalEvents: {
        input: {
          blur: () => this._handlePhoneChange(),
        },
      },
    }),
    appLinkToAccountPage: new Link({
      mode: 'secondary',
      text: 'Отменить',
      href: accountPageLink,
    }),
    appButtonSave: new Button({
      mode: 'primary',
      text: 'Сохранить',
      submit: true,
    }),
  };

  constructor(rootId: string) {
    super('div', {}, rootId);
    this.setProps({
      children: this._childrenComponents,
      internalEvents: {
        [formSelector]: {
          submit: (e: SubmitEvent) => this._handleFormSubmit(e),
        },
      },
    });
  }

  render(): string {
    registerHelpers();
    registerAccountHeaderComponent();
    registerAvatarComponent();
    return Handlebars.compile(editAccountPageTemplate)({ formId });
  }

  private _handleEmailChange(): void {
    this._email = this._childrenComponents.appInputEmail.getValue();
    const { isValid, errorMessage } = this._childrenComponents.appInputEmail.validate();
    this._childrenComponents.appInputEmail.setProps({
      value: this._email,
      error: errorMessage ?? '',
    });
    this._childrenComponents.appInputEmail.setValidState(isValid);
  }

  private _handleLoginChange(): void {
    this._login = this._childrenComponents.appInputLogin.getValue();
    const { isValid, errorMessage } = this._childrenComponents.appInputLogin.validate();
    this._childrenComponents.appInputLogin.setProps({
      value: this._login,
      error: errorMessage ?? '',
    });
    this._childrenComponents.appInputLogin.setValidState(isValid);
  }

  private _handleFirstNameChange(): void {
    this._firstName = this._childrenComponents.appInputFirstName.getValue();
    const { isValid, errorMessage } = this._childrenComponents.appInputFirstName.validate();
    this._childrenComponents.appInputFirstName.setProps({
      value: this._firstName,
      error: errorMessage ?? '',
    });
    this._childrenComponents.appInputFirstName.setValidState(isValid);
  }

  private _handleSecondNameChange(): void {
    this._secondName = this._childrenComponents.appInputSecondName.getValue();
    const { isValid, errorMessage } = this._childrenComponents.appInputSecondName.validate();
    this._childrenComponents.appInputSecondName.setProps({
      value: this._secondName,
      error: errorMessage ?? '',
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
    const { isValid, errorMessage } = this._childrenComponents.appInputPhone.validate();
    this._childrenComponents.appInputPhone.setProps({
      value: this._phone,
      error: errorMessage ?? '',
    });
    this._childrenComponents.appInputPhone.setValidState(isValid);
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._handleEmailChange();
    this._handleLoginChange();
    this._handleFirstNameChange();
    this._handleSecondNameChange();
    this._handleDisplayNameChange();
    this._handlePhoneChange();
    const formData = getFormData(e.target as HTMLFormElement);
    console.log('Edit account form', formData);
  }
}
