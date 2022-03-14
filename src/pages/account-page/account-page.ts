import './account-page.css';
import Handlebars from 'handlebars';
import { accountPageTemplate } from './account-page.tmpl';
import { Routes } from '../../constants/routes';
import { Input } from '../../components/input/input';
import { Link } from '../../components/link/link';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { Block } from '../../lib/Block/Block';
import { registerHelpers } from '../../lib';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../lib/models/page.interface';
import { IUser } from '../../lib/interfaces/user.interface';
import { inAppNavigation } from '../../lib/router/in-app-navigation';

interface IChildren {
  appInputEmail: Input;
  appInputLogin: Input;
  appInputFirstName: Input;
  appInputSecondName: Input;
  appInputDisplayName: Input;
  appInputPhone: Input;
  appLinkToChatPage: Link;
  appLinkToEditAccountPage: Link;
  appLinkToChangePasswordPage: Link;
  appLinkToExit: Link;
}

export interface IAccountPageProps extends IComponentProps {
  children?: IChildren;
  fieldsValues?: IUser;
}

const template = Handlebars.compile(accountPageTemplate);

export class AccountPage extends Block<IAccountPageProps> {
  private _childrenComponents: IChildren = {
    appInputEmail: new Input({
      name: 'email',
      label: 'Почта',
      mode: 'readonly',
      value: this.props.fieldsValues?.email,
    }),
    appInputLogin: new Input({
      name: 'login',
      label: 'Логин',
      mode: 'readonly',
      value: this.props.fieldsValues?.login,
    }),
    appInputFirstName: new Input({
      name: 'first_name',
      label: 'Имя',
      mode: 'readonly',
      value: this.props.fieldsValues?.firstName,
    }),
    appInputSecondName: new Input({
      name: 'second_name',
      label: 'Фамилия',
      mode: 'readonly',
      value: this.props.fieldsValues?.secondName,
    }),
    appInputDisplayName: new Input({
      name: 'display_name',
      label: 'Имя в чате',
      mode: 'readonly',
      value: this.props.fieldsValues?.displayName,
    }),
    appInputPhone: new Input({
      name: 'phone',
      label: 'Телефон',
      mode: 'readonly',
      value: this.props.fieldsValues?.phone,
    }),
    appLinkToChatPage: new Link({
      mode: 'secondary',
      text: 'Вернуться к чатам',
      href: `..${Routes.CHATS}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.CHATS),
      },
    }),
    appLinkToEditAccountPage: new Link({
      mode: 'secondary',
      text: 'Изменить информацию',
      href: `..${Routes.EDIT_ACCOUNT}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.EDIT_ACCOUNT),
      },
    }),
    appLinkToChangePasswordPage: new Link({
      mode: 'secondary',
      text: 'Изменить пароль',
      href: `..${Routes.CHANGE_PASSWORD}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.CHANGE_PASSWORD),
      },
    }),
    appLinkToExit: new Link({
      mode: 'dangerous',
      text: 'Выйти',
      href: `..${Routes.INDEX}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.INDEX),
      },
    }),
  };

  constructor({ rootId, props }: IPageConstructorParams<IAccountPageProps>) {
    super('div', props, rootId);
    this.setProps({
      children: this._childrenComponents,
    });
  }

  override componentDidMount() {
    super.componentDidMount();
    document.title = getDocumentTitle('Аккаунт');
  }

  render(): string {
    registerHelpers();
    return template({});
  }
}
