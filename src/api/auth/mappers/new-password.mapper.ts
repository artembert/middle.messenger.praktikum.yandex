import { Mapper } from '../../mapper';
import { INewPassword } from '../../../lib/interfaces/new-password.interface';
import { INewPasswordDto } from '../dto/new-password.dto';

/* eslint-disable class-methods-use-this */
class NewPasswordMapper implements Mapper {
  public toDTO(entity: INewPassword): INewPasswordDto {
    return {
      oldPassword: entity.oldPassword,
      newPassword: entity.newPassword,
    };
  }

  public toDomain(): void {}
}

export const newPasswordMapper = new NewPasswordMapper();
