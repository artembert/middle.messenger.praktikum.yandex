/* eslint-disable class-methods-use-this */
import { Mapper } from '../../mapper';
import { chatUserMapper } from './chat-user.mapper';
import { IChatDto, ILastMessageDto } from '../dto/chat.dto';
import { IChat, ILastMessage } from '../../../lib/interfaces/chat';

class ChatMapper implements Mapper {
  public toDTO(entity: IChat): IChatDto {
    const hasLastMessage = !!entity.lastMessage;
    let lastMessage: ILastMessageDto | null = null;
    if (hasLastMessage) {
      const message = getLastMessage(entity);
      lastMessage = {
        user: chatUserMapper.toDTO(message.user),
        time: message.time.toISOString(),
        content: message.content,
      };
    }
    return {
      id: entity.id,
      title: entity.title,
      avatar: entity.avatar,
      unread_count: entity.unreadCount,
      last_message: lastMessage,
    };
  }

  public toDomain(raw: IChatDto): IChat {
    const hasLastMessage = !!raw.last_message;
    let lastMessage: ILastMessage | undefined;
    if (hasLastMessage) {
      const message = getLastMessageDto(raw);
      lastMessage = {
        user: chatUserMapper.toDomain(message.user),
        time: new Date(message.time),
        content: message.content,
      };
    }

    return {
      id: raw.id,
      title: raw.title,
      avatar: raw.avatar,
      unreadCount: raw.unread_count,
      lastMessage: lastMessage ?? undefined,
    };
  }
}

function getLastMessage(chat: IChat): ILastMessage {
  if (chat.lastMessage) {
    return chat.lastMessage as ILastMessage;
  }
  throw Error('lastMessage does not exists in given chat');
}

function getLastMessageDto(chat: IChatDto): ILastMessageDto {
  if (chat.last_message) {
    return chat.last_message as ILastMessageDto;
  }
  throw Error('lastMessage does not exists in given chat');
}

export const chatMapper = new ChatMapper();
