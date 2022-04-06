import { Mapper } from '../../mapper';
import { IUser } from '../../../lib/interfaces/user.interface';
import { IUserDTO } from '../dto/user.dto';

/* eslint-disable class-methods-use-this */
class UserMapper implements Mapper {
  public toDTO(entity: IUser): IUserDTO {
    return {
      email: entity.email,
      first_name: entity.firstName,
      second_name: entity.secondName,
      display_name: entity.displayName,
      login: entity.login,
      phone: entity.phone,
      id: entity.id,
      avatar: entity.avatar,
    };
  }

  public toDomain(raw: IUserDTO): IUser {
    return {
      email: raw?.email ?? '',
      firstName: raw?.first_name ?? '',
      secondName: raw?.second_name ?? '',
      displayName: raw?.display_name ?? '',
      login: raw?.login ?? '',
      phone: (raw?.phone as Phone) ?? '',
      id: (raw?.id as unknown as number) ?? 0,
      avatar: raw?.avatar ?? '',
    };
  }
}

export const userMapper = new UserMapper();
