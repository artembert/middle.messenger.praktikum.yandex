import './change-avatar-page.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { changeAvatarPageTemplate } from './change-avatar-page.tmpl';
import { Routes } from '../../constants/routes';
import { Button } from '../../components/button/button';
import { Link } from '../../components/link/link';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { Block } from '../../lib/block/block';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { inAppNavigation } from '../../lib/router/in-app-navigation';
import { changeAvatar } from '../../business-logic/user/change-avatar';
import { Router } from '../../lib/router/router';
import { validationMessage } from '../../presentation-logic/forms/validate-input';

interface IChildren {
  appButtonSave: Button;
  appLinkToAccountPage: Link;
}

export interface IChangeAvatarPageProps extends IComponentProps {
  children?: IChildren;
  validationMessage?: string;
}

const formId = `i${v4()}`;
const formSelector = `#${formId}`;
const uploadInputId = `i${v4()}`;
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

  constructor(props: IChangeAvatarPageProps, rootId: string) {
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
    return template({
      formId,
      uploadInputId,
      validationMessage: this.props.validationMessage,
    });
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    const form: HTMLFormElement = e.target as HTMLFormElement;
    changeAvatar(new FormData(form)).then((res) => {
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
  }
}
