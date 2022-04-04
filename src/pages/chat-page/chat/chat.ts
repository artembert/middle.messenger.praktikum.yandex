import './chat.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { Block } from '../../../lib/block/block';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { chatTemplate } from './chat.tmpl';
import { Input } from '../../../components/input/input';
import { notEmpty } from '../../../presentation-logic/forms/validate-input';
import { Button } from '../../../components/button/button';
import { Avatar } from '../../../components/avatar/avatar';
import { getChatName } from '../../../presentation-logic/chat-name';
import { Modal } from '../../../components/modal/modal';
import AddressBook from '../../../components/address-book';
import { clearUsersInStore } from '../../../business-logic/user/clear-users-in-store';
import { IUser } from '../../../lib/interfaces/user.interface';
import { addUsersToChat } from '../../../business-logic/chats/add-users-to-chat';
import { IChat } from '../../../lib/interfaces/chat';
import {
  ChatWebSocket,
  IMessageResponse,
  MessageType,
} from '../../../api/chats/chat-web-socket';

interface IChildren {
  appInputChatMessage: Input;
  appButtonSendMessage: Button;
  appAvatar?: Avatar;
  appModal?: Modal;
}

export interface IChatProps extends IComponentProps {
  children?: IChildren;
  isDefaultHeaderActionSelected?: boolean;
  currentChat?: IChat;
  chatToken?: string;
  userId?: number;
}

const newMessageFormId = `i${v4()}`;
const headerActionsId = `i${v4()}`;
const newMessageFormSelector = `#${newMessageFormId}`;
const headerActionsIdSelector = `#${headerActionsId}`;
const template = Handlebars.compile(chatTemplate);

export class Chat extends Block<IChatProps> {
  private _message: string = '';

  private _socket: ChatWebSocket | null = null;

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
      children: {
        appContent: new AddressBook(
          {
            action: (user: IUser) => handleAddUserToChat(user, 2348),
            actionName: '+',
          },
          '',
        ),
      },
      onClose: () => handleMemberListClose(),
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
    const { currentChat } = this.props;
    return template({
      newMessageFormId,
      headerActionsId,
      title: currentChat ? getChatName(currentChat) : '',
      hasCurrentChat: !!currentChat,
    });
  }

  protected override componentDidUpdate(
    oldProps: IChatProps,
    newProps: IChatProps,
  ): boolean {
    if (this.props.currentChat && this.props.chatToken && this.props.userId) {
      this._openSocket(
        this.props.userId,
        this.props.currentChat.id,
        this.props.chatToken,
      );
    }
    return super.componentDidUpdate(oldProps, newProps);
  }

  private _openSocket(userId: number, chatId: number, token: string): void {
    this._socket = new ChatWebSocket();
    this._socket.init({ userId, chatId, token }, (message) =>
      this._socketMessageHandler(message),
    );
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
    this._socket?.sendMessage(this._message);
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

  private _socketMessageHandler(response: IMessageResponse) {
    if (response.type === MessageType.CHAT_MESSAGE) {
      console.log(response);
      // addMessages(response.content);
      // this._socket?.increaseOffsetBy(response.content.length);
    }
  }
}

function handleMemberListClose(): void {
  clearUsersInStore();
}

function handleAddUserToChat(user: IUser, chatId: number): void {
  addUsersToChat([user.id], chatId);
}
