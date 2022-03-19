/* eslint-disable class-methods-use-this */
import { Mapper } from '../../mapper';
import { chatUserMapper } from './chat-user.mapper';
import { IChatDto } from '../dto/chat.dto';
import { IChat } from '../../../lib/interfaces/chat';

class ChatMapper implements Mapper {
  public toDTO(entity: IChat): IChatDto {
    const user = chatUserMapper.toDTO(entity.lastMessage.user);
    return {
      id: entity.id,
      title: entity.title,
      avatar: entity.avatar,
      unread_count: entity.unreadCount,
      last_message: {
        user,
        time: entity.lastMessage.time.toUTCString(),
        content: entity.lastMessage.content,
      },
    };
  }

  public toDomain(raw: IChatDto): IChat {
    const user = chatUserMapper.toDomain(raw.last_message.user);
    return {
      id: raw.id,
      title: raw.title,
      avatar: raw.avatar,
      unreadCount: raw.unread_count,
      lastMessage: {
        user,
        time: new Date(raw.last_message.time),
        content: raw.last_message.content,
      },
    };
  }
}

export const chatMapper = new ChatMapper();
