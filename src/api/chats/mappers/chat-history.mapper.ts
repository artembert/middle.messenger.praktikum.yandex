/* eslint-disable class-methods-use-this */
import { Mapper } from '../../mapper';
import { IChatMessage } from '../../../lib/interfaces/chat-message.interface';
import { IChatHistoryMessageDto } from '../dto/chat-history-message.dto';

class ChatHistoryMapper implements Mapper {
  public toDTO(): void {}

  public toDomain(raw: IChatHistoryMessageDto): IChatMessage {
    return {
      time: new Date(raw.time),
      id: raw.id,
      userId: raw.user_id,
      content: raw.content,
    };
  }
}

export const chatHistoryMapper = new ChatHistoryMapper();
