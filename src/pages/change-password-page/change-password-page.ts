import './change-password-page.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { changePasswordPageTemplate } from './change-password-page.tmpl';
import { Routes } from '../../constants/routes';
import { Input } from '../../components/input/input';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { Block } from '../../lib/Block/Block';
import {
  maxLength,
  minLength,
  password,
  validationMessage,
} from '../../presentation-logic/forms/validate-input';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../lib/models/page.interface';
import { inAppNavigation } from '../../lib/router/in-app-navigation';
import { INewPassword } from '../../lib/interfaces/new-password.interface';
import { Router } from '../../lib/router/router';
import { changePassword } from '../../business-logic/user/change-password';

interface IChildren {
  appInputOldPassword: Input;
  appInputPassword: Input;
  appInputPasswordRepeat: Input;
  appButtonSave: Button;
  appLinkToAccountPage: Link;
}

export interface IChangePasswordPageProps extends IComponentProps {
  children?: IChildren;
}

const formId = `i${v4()}`;
const formSelector = `#${formId}`;
const template = Handlebars.compile(changePasswordPageTemplate);

export class ChangePasswordPage extends Block<IChangePasswordPageProps> {
  private _oldPassword: string = '';

  private _password: string = '';

  private _passwordRepeat: string = '';

  private _childrenComponents: IChildren = {
    appInputOldPassword: new Input({
      name: 'old-password',
      label: 'Старый пароль',
      type: 'password',
      internalEvents: {
        input: {
          blur: () => this._handleOldPasswordChange(),
        },
      },
    }),
    appInputPassword: new Input({
      name: 'password',
      label: 'Новый пароль',
      type: 'password',
      validationFns: [minLength(8), maxLength(40), password()],
      internalEvents: {
        input: {
          blur: () => this._handlePasswordChange(),
        },
      },
    }),
    appInputPasswordRepeat: new Input({
      name: 'password-repeat',
      label: 'Пароль',
      type: 'password',
      validationFns: [minLength(8), maxLength(40), password()],
      internalEvents: {
        input: {
          blur: () => this._handlePasswordRepeatChange(),
        },
      },
    }),
    appButtonSave: new Button({
      mode: 'primary',
      text: 'Сохранить',
      submit: true,
    }),
    appLinkToAccountPage: new Link({
      mode: 'secondary',
      text: 'Отменить',
      href: `..${Routes.ACCOUNT}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.ACCOUNT),
      },
    }),
  };

  constructor({
    rootId,
    props,
  }: IPageConstructorParams<IChangePasswordPageProps>) {
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
    document.title = getDocumentTitle('Измененить пароль');
  }

  render(): string {
    return template({ formId });
  }

  private _handleOldPasswordChange(): boolean {
    this._oldPassword = this._childrenComponents.appInputOldPassword.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputOldPassword.validate();
    this._childrenComponents.appInputOldPassword.setProps({
      value: this._oldPassword,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputOldPassword.setValidState(isValid);
    return isValid;
  }

  private _handlePasswordChange(): boolean {
    this._password = this._childrenComponents.appInputPassword.getValue();
    const { isValid, errorMessage } =
      this._childrenComponents.appInputPassword.validate();
    this._childrenComponents.appInputPassword.setProps({
      value: this._password,
      error: errorMessage ?? undefined,
    });
    this._childrenComponents.appInputPassword.setValidState(isValid);
    return isValid;
  }

  private _handlePasswordRepeatChange(): boolean {
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
    return isValid;
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    if (!this._isFormValid()) {
      return;
    }
    const formData = getFormData(e.target as HTMLFormElement);
    const newPassword = convertFormToNewPassword(formData);
    changePassword(newPassword).then((res) => {
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
    console.log('Change password form', formData);
  }

  private _isFormValid(): boolean {
    return [
      this._handleOldPasswordChange(),
      this._handlePasswordChange(),
      this._handlePasswordRepeatChange(),
    ].every((isValid) => isValid);
  }
}

function convertFormToNewPassword(
  formData: Record<string, FormDataEntryValue>,
): INewPassword {
  return {
    oldPassword: formData['old-password'] as string,
    newPassword: formData.password as Phone,
  };
}
