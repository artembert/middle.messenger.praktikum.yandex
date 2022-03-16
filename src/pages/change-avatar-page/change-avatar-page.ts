import './change-avatar-page.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { changeAvatarPageTemplate } from './change-avatar-page.tmpl';
import { Routes } from '../../constants/routes';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { Block } from '../../lib/Block/Block';
import { validationMessage } from '../../presentation-logic/forms/validate-input';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../lib/models/page.interface';
import { inAppNavigation } from '../../lib/router/in-app-navigation';
import { INewPassword } from '../../lib/interfaces/new-password.interface';
import { Router } from '../../lib/router/router';
import { changePassword } from '../../business-logic/user/change-password';

interface IChildren {
  appButtonSave: Button;
  appLinkToAccountPage: Link;
}

export interface IChangeAvatarPageProps extends IComponentProps {
  children?: IChildren;
}

const formId = `i${v4()}`;
const formSelector = `#${formId}`;
const template = Handlebars.compile(changeAvatarPageTemplate);

export class ChangeAvatarPage extends Block<IChangeAvatarPageProps> {
  private _childrenComponents: IChildren = {
    appButtonSave: new Button({
      mode: 'primary',
      text: 'Обновить аватар',
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
  }: IPageConstructorParams<IChangeAvatarPageProps>) {
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

  // private _handleOldPasswordChange(): boolean {
  //   this._oldPassword = this._childrenComponents.appInputOldPassword.getValue();
  //   const { isValid, errorMessage } =
  //     this._childrenComponents.appInputOldPassword.validate();
  //   this._childrenComponents.appInputOldPassword.setProps({
  //     value: this._oldPassword,
  //     error: errorMessage ?? undefined,
  //   });
  //   this._childrenComponents.appInputOldPassword.setValidState(isValid);
  //   return isValid;
  // }

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
    return [].every((isValid) => isValid);
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
