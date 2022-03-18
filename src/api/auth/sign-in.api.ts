import { Http } from '../../services/http/http';
import { AuthEndpoint } from '../../constants/endpoints.constant';
import { credentialsMapper } from './mappers/credentials.mapper';
import { ICredentials } from '../../lib/interfaces/credentials.interface';
import { HttpError } from '../../services/http/http-error';
import { validationMessage } from '../../presentation-logic/forms/validate-input';

interface Failed {
  message: string;
  code?: number;
}

interface ISignInApiResponseSuccess extends ApiResponse<undefined> {
  isSuccess: true;
}

interface ISignInApiResponseFailed extends ApiResponse<Failed> {
  isSuccess: false;
}

const http = new Http();

export function signInApi(
  credentials: ICredentials,
): Promise<ISignInApiResponseSuccess | ISignInApiResponseFailed> {
  const credentialsDTO = credentialsMapper.toDTO(credentials);

  return http
    .post<undefined>(AuthEndpoint.SIGN_IN, {
      data: JSON.stringify(credentialsDTO),
      withCredentials: true,
    })
    .then(
      () =>
        ({
          isSuccess: true,
          payload: undefined,
        } as ISignInApiResponseSuccess),
    )
    .catch((error) => {
      if (error instanceof HttpError) {
        if (error.code === 401) {
          return {
            isSuccess: false,
            payload: {
              code: 400,
              message: validationMessage.invalidLoginOrPassword,
            } as Failed,
          };
        }
        return {
          isSuccess: false,
          payload: { code: error.code, message: error.payload } as Failed,
        };
      }
      return {
        isSuccess: false,
        payload: { code: error?.code, message: error.payload } as Failed,
      };
    });
}
