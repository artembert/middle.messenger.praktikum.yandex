/* eslint-disable class-methods-use-this */
import { Mapper } from '../../mapper';
import { IChatMessage } from '../../../lib/interfaces/chat-message.interface';
import { IChatMessageDto } from '../dto/chat-message.dto';

class ChatMessageMapper implements Mapper {
  public toDTO(): void {}

  public toDomain(raw: IChatMessageDto): IChatMessage {
    return {
      time: new Date(raw.time),
      id: raw.id,
      userId: raw.userId,
      content: raw.content,
    };
  }
}

export const chatMessageMapper = new ChatMessageMapper();
