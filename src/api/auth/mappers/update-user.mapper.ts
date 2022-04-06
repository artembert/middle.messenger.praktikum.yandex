import { Mapper } from '../../mapper';
import { IEditableUserInfoDTO } from '../dto/editable-user-info.dto';
import { IEditableUserInfo } from '../../../lib/interfaces/editable-user-info';

/* eslint-disable class-methods-use-this */
class UserInfoEditableMapper implements Mapper {
  public toDTO(entity: IEditableUserInfo): IEditableUserInfoDTO {
    return {
      email: entity.email,
      first_name: entity.firstName,
      second_name: entity.secondName,
      display_name: entity.displayName,
      login: entity.login,
      phone: entity.phone,
    };
  }

  public toDomain(): void {}
}

export const userInfoEditableMapper = new UserInfoEditableMapper();
