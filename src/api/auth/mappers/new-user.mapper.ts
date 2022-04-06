import { INewUser } from '../../../lib/interfaces/new-user.interface';
import { INewUserDTO } from '../dto/new-user.dto';
import { Mapper } from '../../mapper';

/* eslint-disable class-methods-use-this */
class NewUserMapper implements Mapper {
  public toDTO(entity: INewUser): INewUserDTO {
    return {
      email: entity.email,
      first_name: entity.firstName,
      second_name: entity.secondName,
      display_name: entity.displayName,
      login: entity.login,
      password: entity.password,
      phone: entity.phone,
    };
  }

  public toDomain(raw: Record<string, string>): INewUser {
    return {
      email: raw?.email ?? '',
      firstName: raw?.first_name ?? '',
      secondName: raw?.second_name ?? '',
      displayName: raw?.display_name ?? '',
      login: raw?.login ?? '',
      password: raw?.password ?? '',
      phone: (raw?.phone as Phone) ?? '',
    };
  }
}

export const newUserMapper = new NewUserMapper();
