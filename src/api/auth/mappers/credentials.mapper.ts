import { Mapper } from '../../mapper';
import { ICredentialsDTO } from '../dto/credentials.dto';
import { ICredentials } from '../../../lib/interfaces/credentials.interface';

/* eslint-disable class-methods-use-this */
class CredentialsMapper implements Mapper {
  public toDTO(entity: ICredentials): ICredentialsDTO {
    return {
      login: entity.login,
      password: entity.password,
    };
  }

  public toDomain(raw: ICredentialsDTO): ICredentials {
    return {
      login: raw?.login ?? '',
      password: raw?.password ?? '',
    };
  }
}

export const credentialsMapper = new CredentialsMapper();
