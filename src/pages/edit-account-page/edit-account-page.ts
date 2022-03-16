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
  validationMessage,
} from '../../presentation-logic/forms/validate-input';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { registerHelpers } from '../../lib';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../lib/models/page.interface';
import { IUser } from '../../lib/interfaces/user.interface';
import { updateUser } from '../../business-logic/user/update-user';
import { Router } from '../../lib/router/router';
import { inAppNavigation } from '../../lib/router/in-app-navigation';
import { AccountHeader } from '../../components/account-header/account-header';
import { AvatarEditable } from '../../components/avatar-editable/avatar-editable';

interface IChildren {
  appInputEmail: Input;
  appInputLogin: Input;
  appInputFirstName: Input;
  appInputSecondName: Input;
  appInputDisplayName: Input;
  appInputPhone: Input;
  appLinkToAccountPage: Link;
  appButtonSave: Button;
  appAccountHeader: AccountHeader;
}

export interface IEditAccountPageProps extends IComponentProps {
  children?: IChildren;
  fieldsValues?: IUser;
  validationMessage?: string;
}

const formId = `i${v4()}`;
const formSelector = `#${formId}`;
const template = Handlebars.compile(editAccountPageTemplate);

export class EditAccountPage extends Block<IEditAccountPageProps> {
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
      value: this.props.fieldsValues?.email,
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
      value: this.props.fieldsValues?.login,
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
      value: this.props.fieldsValues?.firstName,
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
      value: this.props.fieldsValues?.secondName,
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
      value: this.props.fieldsValues?.secondName,
      internalEvents: {
        input: {
          blur: () => this._handleDisplayNameChange(),
        },
      },
    }),
    appInputPhone: new Input({
      name: 'phone',
      label: 'Телефон',
      value: this.props.fieldsValues?.phone,
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
      href: `..${Routes.ACCOUNT}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.ACCOUNT),
      },
    }),
    appButtonSave: new Button({
      mode: 'primary',
      text: 'Сохранить',
      submit: true,
    }),
    appAccountHeader: new AccountHeader({
      title: 'Редактировать аккаунт',
      children: {
        appAvatarEditable: new AvatarEditable({
          internalEvents: {
            button: {
              click: (e) => inAppNavigation(e, Routes.CHANGE_AVATAR),
            },
          },
        }),
      },
    }),
  };

  constructor({
    rootId,
    props,
  }: IPageConstructorParams<IEditAccountPageProps>) {
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
    document.title = getDocumentTitle('Редактировать аккаунт');
  }

  render(): string {
    registerHelpers();
    return template({
      formId,
      validationMessage: this.props.validationMessage,
    });
  }

  private _handleEmailChange(): boolean {
    this._email = this._childrenComponents.appInputEmail.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputEmail.validate();
    this._childrenComponents.appInputEmail.setProps({
      value: this._email,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputEmail.setValidState(isValid);
    return isValid;
  }

  private _handleLoginChange(): boolean {
    this._login = this._childrenComponents.appInputLogin.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputLogin.validate();
    this._childrenComponents.appInputLogin.setProps({
      value: this._login,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputLogin.setValidState(isValid);
    return isValid;
  }

  private _handleFirstNameChange(): boolean {
    this._firstName = this._childrenComponents.appInputFirstName.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputFirstName.validate();
    this._childrenComponents.appInputFirstName.setProps({
      value: this._firstName,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputFirstName.setValidState(isValid);
    return isValid;
  }

  private _handleSecondNameChange(): boolean {
    this._secondName = this._childrenComponents.appInputSecondName.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputSecondName.validate();
    this._childrenComponents.appInputSecondName.setProps({
      value: this._secondName,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputSecondName.setValidState(isValid);
    return isValid;
  }

  private _handleDisplayNameChange(): void {
    this._displayName = this._childrenComponents.appInputSecondName.getValue();
    this._childrenComponents.appInputSecondName.setProps({
      value: this._displayName,
    });
  }

  private _handlePhoneChange(): boolean {
    this._phone = this._childrenComponents.appInputPhone.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputPhone.validate();
    this._childrenComponents.appInputPhone.setProps({
      value: this._phone,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputPhone.setValidState(isValid);
    return isValid;
  }

  private _isFormValid(): boolean {
    return [
      this._handleEmailChange(),
      this._handleLoginChange(),
      this._handleFirstNameChange(),
      this._handleSecondNameChange(),
      this._handlePhoneChange(),
    ].every((isValid) => isValid);
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    if (!this._isFormValid()) {
      return;
    }
    const formData = getFormData(e.target as HTMLFormElement);
    const user = convertFormToUser(formData);
    updateUser(user).then((res) => {
      if (res.isSuccess) {
        const router = new Router();
        router.go(Routes.ACCOUNT);
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

    console.log('Edit account form', formData);
  }
}

function convertFormToUser(
  formData: Record<string, FormDataEntryValue>,
): Omit<IUser, 'id' | 'avatar'> {
  return {
    email: formData.email as string,
    firstName: formData.first_name as string,
    secondName: formData.second_name as string,
    displayName: formData.display_name as string,
    login: formData.login as string,
    phone: formData.phone as Phone,
  };
}
