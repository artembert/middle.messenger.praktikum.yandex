import './chat-page.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { chatPageTemplate } from './chat-page.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { getFormData } from '../../presentation-logic/forms/get-form-data';
import { Button } from '../../components/button/button';
import { Input } from '../../components/input/input';
import { notEmpty } from '../../presentation-logic/forms/validate-input';
import Roster from './roster';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../lib/models/page.interface';

interface IChildren {
  appInputChatMessage: Input;
  appButtonSendMessage: Button;
  appRoster: Block;
}

export interface IChatPageProps extends IComponentProps {
  children?: IChildren;
}

const newMessageFormId = `i${v4()}`;
const newMessageFormSelector = `#${newMessageFormId}`;
const template = Handlebars.compile(chatPageTemplate);

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
    appRoster: new Roster({ rootId: '', props: {} }),
  };

  constructor({ rootId, props }: IPageConstructorParams<IChatPageProps>) {
    super('div', props, rootId);
    this.setProps({
      children: this._childrenComponents,
      internalEvents: {
        [newMessageFormSelector]: {
          submit: (e: SubmitEvent) => this._handleFormSubmit(e),
        },
      },
    });
  }

  override componentDidMount(): void {
    super.componentDidMount();
    document.title = getDocumentTitle('Чаты');
  }

  render(): string {
    return template({
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
      error: errorMessage ?? undefined,
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
