import './chat-page.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { chatPageTemplate } from './chat-page.tmpl';
import { registerRosterComponent } from './roster';
import { Routes } from '../../constants/routes';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { registerLinkComponent } from '../../view-components/link';
import { registerSearchBarComponent } from '../../view-components/search-bar';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { notEmpty } from '../../presentation-logic/forms/validate-input';

interface IChildren {
  appInputChatMessage: Input;
  appButtonSendMessage: Button;
}

interface IChatPageProps extends IComponentProps {
  children?: IChildren;
}

const chats: undefined[] = new Array(20).fill(undefined);
const accountPageLink = `/${Routes.ACCOUNT}`;
const newMessageFormId = `i${v4()}`;
const newMessageFormSelector = `#${newMessageFormId}`;

export class ChatPage extends Block<IChatPageProps> {
  private _message: string = '';

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
    registerSearchBarComponent();
    registerLinkComponent();
    registerRosterComponent();
    return Handlebars.compile(chatPageTemplate)({
      chats,
      accountPageLink,
      newMessageFormId,
    });
  }

  private _handleMessageChange(): void {
    this._message = this._childrenComponents.appInputChatMessage.getValue();
  }

  private _validateMessage(): void {
    const { isValid, errorMessage } = this._childrenComponents.appInputChatMessage.validate();
    this._childrenComponents.appInputChatMessage.setProps({
      error: errorMessage ?? '',
      value: this._message,
    });
    this._childrenComponents.appInputChatMessage.setValidState(isValid);
  }

  private _handleFormSubmit(e: SubmitEvent): void {
    e.preventDefault();
    this._validateMessage();
    const formData = getFormData(e.target as HTMLFormElement);
    console.log('New message form', formData);
  }
}
