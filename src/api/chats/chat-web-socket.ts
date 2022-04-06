import { ChatsEndpoint } from '../../constants/endpoints.constant';
import { IChatMessage } from '../../lib/interfaces/chat-message.interface';
import { chatMessageMapper } from './mappers/chat-message.mapper';
import {
  ISocketIncomingMessage,
  WebSocketService,
} from '../../lib/web-socket/web-socket-service';
import { chatHistoryMapper } from './mappers/chat-history.mapper';

export interface IMessageResponse {
  type: string;
  content: IChatMessage[];
}

interface IChatWSEndpointParams {
  userId: number;
  chatId: number;
  token: string;
}

export const MessageType = {
  OPEN: 'open',
  CHAT_MESSAGE: 'message',
  GET_OLD: 'get old',
};

type MessageHandler = (message: IMessageResponse) => void;

export class ChatWebSocket extends WebSocketService {
  private _offset: number = 0;

  init(
    endpointParams: IChatWSEndpointParams,
    messageHandler: MessageHandler,
  ): void {
    this.connect(ChatsEndpoint.WEB_SOCKET(endpointParams));
    this.start();
    this.subscribe(MessageType.CHAT_MESSAGE, (res) =>
      handleSocketMessage(messageHandler, res),
    );
    this.subscribe(MessageType.OPEN, () => {
      this.loadOldMessages();
    });
  }

  sendMessage(message: string): void {
    this.send({
      type: MessageType.CHAT_MESSAGE,
      content: message,
    });
  }

  loadOldMessages(): void {
    this.send({ type: MessageType.GET_OLD, content: `${this._offset}` });
  }

  increaseOffsetBy(value: number): void {
    this._offset += value;
  }
}

function handleSocketMessage(
  messageHandler: MessageHandler,
  res?: ISocketIncomingMessage,
): void {
  if (!res) {
    return;
  }
  const { type, data } = res;
  if (type !== 'message') {
    return;
  }
  try {
    const messagesDto = data ? JSON.parse(data) : undefined;
    let messages: IChatMessage[];
    if (Array.isArray(messagesDto)) {
      messages = messagesDto.map((item) => chatHistoryMapper.toDomain(item));
    } else {
      messages =
        messagesDto?.type !== 'message'
          ? []
          : [chatMessageMapper.toDomain(messagesDto)];
    }
    if (messages.length) {
      messageHandler({
        type,
        content: messages,
      });
    }
  } catch (e) {
    console.error(e, type, data);
  }
}
