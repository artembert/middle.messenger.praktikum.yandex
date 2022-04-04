/* eslint-disable class-methods-use-this */
import { Mapper } from '../../mapper';
import { IChatMessage } from '../../../lib/interfaces/chat-message.interface';
import { IChatMessageDto } from '../dto/chat-message.dto';

class ChatMessageMapper implements Mapper {
  public toDTO(entity: IChatMessage): IChatMessageDto {
    return {
      time: entity.time.toISOString(),
      type: entity.type,
      user_id: entity.userId,
      content: entity.content,
    };
  }

  public toDomain(raw: IChatMessageDto): IChatMessage {
    return {
      time: new Date(raw.time),
      type: raw.type,
      userId: raw.user_id,
      content: raw.content,
    };
  }
}

export const chatMessageMapper = new ChatMessageMapper();
