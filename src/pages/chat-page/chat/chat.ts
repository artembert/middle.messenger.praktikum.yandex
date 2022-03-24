import './chat.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { Block } from '../../../lib/block/block';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { chatTemplate } from './chat.tmpl';
import { Input } from '../../../components/input/input';
import { notEmpty } from '../../../presentation-logic/forms/validate-input';
import { Button } from '../../../components/button/button';
import { getFormData } from '../../../presentation-logic/forms/get-form-data';
import { Avatar } from '../../../components/avatar/avatar';
import { getChatName } from '../../../presentation-logic/chat-name';
import { Modal } from '../../../components/modal/modal';

interface IChildren {
  appInputChatMessage: Input;
  appButtonSendMessage: Button;
  appAvatar?: Avatar;
  appModal?: Modal;
}

export interface IChatProps extends IComponentProps {
  children?: IChildren;
  isDefaultHeaderActionSelected?: boolean;
}

const newMessageFormId = `i${v4()}`;
const headerActionsId = `i${v4()}`;
const newMessageFormSelector = `#${newMessageFormId}`;
const headerActionsIdSelector = `#${headerActionsId}`;
const template = Handlebars.compile(chatTemplate);

export class Chat extends Block<IChatProps> {
  private _message: string = '';

  private _childrenComponents: IChildren = {
    appAvatar: new Avatar({}),
    appInputChatMessage: new Input({
      name: 'message',
      narrow: true,
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
    appModal: new Modal({
      title: 'Добавить участников',
    }),
  };

  constructor(props: IChatProps) {
    super('div', { classNames: ['chat', ...(props?.classNames ?? [])] });
    this.setProps({
      children: this._childrenComponents,
      internalEvents: {
        [newMessageFormSelector]: {
          submit: (e: SubmitEvent) => this._handleFormSubmit(e),
        },
        [headerActionsIdSelector]: {
          change: (e: InputEvent) => this._handleHeaderActionEvent(e),
        },
      },
    });
  }

  override render(): string {
    const { chat } = this.props;
    return template({
      newMessageFormId,
      headerActionsId,
      title: getChatName(chat),
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

  private _handleHeaderActionEvent(e: InputEvent): void {
    e.preventDefault();
    const { isDefaultHeaderActionSelected } = this.props;
    const { value } = e.target as HTMLOptionElement;
    this.setProps({
      isDefaultHeaderActionSelected: !isDefaultHeaderActionSelected,
    });
    if (value === 'add') {
      this._showUsersList();
      return;
    }
    if (value === 'remove') {
      this._showMemberList();
    }
  }

  private _showUsersList(): void {
    console.log('add new member');
    this._childrenComponents.appModal?._openDialog();
  }

  private _showMemberList(): void {
    console.log('remove members');
    this._childrenComponents.appModal?._openDialog();
  }
}
