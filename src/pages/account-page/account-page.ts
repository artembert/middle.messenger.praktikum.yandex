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
