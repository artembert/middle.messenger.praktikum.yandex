import { ChatsEndpoint } from '../../constants/endpoints.constant';
import { IChatMessage } from '../../lib/interfaces/chat-message.interface';
import { chatMessageMapper } from './mappers/chat-message.mapper';
import { WebSocketService } from '../../lib/web-socket/web-socket-service';

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

export class ChatWebSocket extends WebSocketService {
  private _offset: number = 0;

  init(
    endpointParams: IChatWSEndpointParams,
    messageHandler: (message: IMessageResponse) => void,
  ): void {
    this.connect(ChatsEndpoint.WEB_SOCKET(endpointParams));
    this.start();
    this.subscribe(MessageType.CHAT_MESSAGE, (res) => {
      if (res) {
        const { type, data } = res;
        const messagesDto = data ? JSON.parse(data) : undefined;
        // console.log(messagesDto);
        const messages = Array.isArray(messagesDto)
          ? messagesDto.map((item) => chatMessageMapper.toDomain(item))
          : [chatMessageMapper.toDomain(messagesDto)];
        messageHandler({ type, content: messages });
      }
    });
    this.subscribe(MessageType.OPEN, () => {
      this.loadOldMessages();
    });
  }

  sendMessage(message: string): void {
    this.send({ type: MessageType.CHAT_MESSAGE, content: message });
  }

  loadOldMessages(): void {
    this.send({ type: MessageType.GET_OLD, content: `${this._offset}` });
  }

  increaseOffsetBy(value: number): void {
    this._offset += value;
  }
}
