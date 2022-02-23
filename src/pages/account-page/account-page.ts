import './account-page.css';
import Handlebars from 'handlebars';
import { accountPageTemplate } from './account-page.tmpl';
import { Routes } from '../../constants/routes';
import { Input } from '../../components/input/input';
import { Link } from '../../components/link/link';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { Block } from '../../lib/Block/Block';
import { registerHelpers } from '../../lib';

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

interface IAccountPageProps extends IComponentProps {
  children?: IChildren;
}

const chatPageLink = `..${Routes.CHATS}`;
const editAccountPageLink = `..${Routes.EDIT_ACCOUNT}`;
const changePasswordPageLink = `..${Routes.CHANGE_PASSWORD}`;
const indexPageLink = '/';
const template = Handlebars.compile(accountPageTemplate);

export class AccountPage extends Block<IAccountPageProps> {
  private _childrenComponents: IChildren = {
    appInputEmail: new Input({
      name: 'email',
      label: 'Почта',
      mode: 'readonly',
      value: 'user-eml-96@gmail.com',
    }),
    appInputLogin: new Input({
      name: 'login',
      label: 'Логин',
      mode: 'readonly',
      value: 'user-eml-96',
    }),
    appInputFirstName: new Input({
      name: 'first_name',
      label: 'Имя',
      mode: 'readonly',
      value: 'Дмитрий',
    }),
    appInputSecondName: new Input({
      name: 'second_name',
      label: 'Фамилия',
      mode: 'readonly',
      value: 'Федоров',
    }),
    appInputDisplayName: new Input({
      name: 'display_name',
      label: 'Имя в чате',
      mode: 'readonly',
      value: 'Дмитрий Ф.',
    }),
    appInputPhone: new Input({
      name: 'phone',
      label: 'Телефон',
      mode: 'readonly',
      value: '+79995280752',
    }),
    appLinkToChatPage: new Link({
      mode: 'secondary',
      text: 'Вернуться к чатам',
      href: chatPageLink,
    }),
    appLinkToEditAccountPage: new Link({
      mode: 'secondary',
      text: 'Изменить информацию',
      href: editAccountPageLink,
    }),
    appLinkToChangePasswordPage: new Link({
      mode: 'secondary',
      text: 'Изменить пароль',
      href: changePasswordPageLink,
    }),
    appLinkToExit: new Link({
      mode: 'dangerous',
      text: 'Выйти',
      href: indexPageLink,
    }),
  };

  constructor(rootId: string) {
    super('div', {}, rootId);
    this.setProps({
      children: this._childrenComponents,
    });
  }

  render(): string {
    registerHelpers();
    return template({});
  }
}
