import { Mapper } from '../../mapper';
import { IChatUserDTO } from '../dto/chat-user.dto';
import { IChatUser } from '../../../lib/interfaces/chat-user.interface';

/* eslint-disable class-methods-use-this */
class ChatUserMapper implements Mapper {
  public toDTO(entity: IChatUser): IChatUserDTO {
    return {
      email: entity.email,
      first_name: entity.firstName,
      second_name: entity.secondName,
      login: entity.login,
      phone: entity.phone,
      avatar: entity.avatar,
    };
  }

  public toDomain(raw: IChatUserDTO): IChatUser {
    return {
      email: raw?.email ?? '',
      firstName: raw?.first_name ?? '',
      secondName: raw?.second_name ?? '',
      login: raw?.login ?? '',
      phone: (raw?.phone as Phone) ?? '',
      avatar: raw?.avatar ?? '',
    };
  }
}

export const chatUserMapper = new ChatUserMapper();
