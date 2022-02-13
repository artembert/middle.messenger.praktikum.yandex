import './chat-page.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { chatPageTemplate } from './chat-page.tmpl';
import { Routes } from '../../constants/routes';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { notEmpty } from '../../presentation-logic/forms/validate-input';
import { SearchBar } from '../../components/search-bar/search-bar';
import { Roster } from './roster/roster';
import { Link } from '../../components/link/link';

interface IChildren {
  appInputChatMessage: Input;
  appButtonSendMessage: Button;
  appRoster: Roster;
}

interface IChatPageProps extends IComponentProps {
  children?: IChildren;
}

const chats: undefined[] = new Array(20).fill(undefined);
const accountPageLink = `/${Routes.ACCOUNT}`;
const newMessageFormId = `i${v4()}`;
const newMessageFormSelector = `#${newMessageFormId}`;
const template = Handlebars.compile(chatPageTemplate);

export class ChatPage extends Block<IChatPageProps> {
  private _message: string = '';
  // @ts-ignore
  private _rosterSearch: string = '';

  private _rosterChildredComponents = {
    appSearchBar: new SearchBar({
      name: 'roster-search',
      placeholder: 'Поиск',
      internalEvents: {
        input: {
          input: () => this._handleRosterSearchBarChange(),
        },
      },
    }),
    appLinkToAccountPage: new Link({
      mode: 'icon',
      text: '⚙️',
      href: accountPageLink,
    }),
  };

  private _childrenComponents: IChildren = {
    appInputChatMessage: new Input({
      name: 'message',
      validationFns: [notEmpty()],
      internalEvents: {
        input: {
          blur: () => this._handleMessageChange(),
        },
      },
    }),
    appButtonSendMessage: new Button({
      mode: 'primary',
      text: 'Отправить',
      submit: true,
    }),
    appRoster: new Roster(
      {
        appSearchBar: this._rosterChildredComponents.appSearchBar,
        appLinkToAccountPage:
          this._rosterChildredComponents.appLinkToAccountPage,
      },
      { classNames: ['chat-page__roster'], chats },
    ),
  };

  constructor(rootId: string) {
    super('div', {}, rootId);
    this.setProps({
      children: this._childrenComponents,
      internalEvents: {
        [newMessageFormSelector]: {
          submit: (e: SubmitEvent) => this._handleFormSubmit(e),
        },
      },
    });
  }

  render(): string {
    return template({
      accountPageLink,
      newMessageFormId,
    });
  }

  private _handleMessageChange(): void {
    this._message = this._childrenComponents.appInputChatMessage.getValue();
  }

  private _validateMessage(): void {
    const { isValid, errorMessage } =
      this._childrenComponents.appInputChatMessage.validate();
    this._childrenComponents.appInputChatMessage.setProps({
      error: errorMessage ?? '',
      value: this._message,
    });
    this._childrenComponents.appInputChatMessage.setValidState(isValid);
  }

  private _handleRosterSearchBarChange(): void {
    this._rosterSearch = this._rosterChildredComponents.appSearchBar.getValue();
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._validateMessage();
    const formData = getFormData(e.target as HTMLFormElement);
    console.log('New message form', formData);
  }
}
