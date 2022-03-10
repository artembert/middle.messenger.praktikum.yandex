import { Http } from '../../services/http/http';
import { AuthEndpoint } from '../../configs/endpoints.constant';
import { credentialsMapper } from './mappers/credentials.mapper';
import { ICredentials } from '../../lib/interfaces/credentials.interface';
import { HttpError } from '../../services/http/http-error';
import { validationMessage } from '../../presentation-logic/forms/validate-input';

interface ISignInApiResponseSuccess extends ApiResponse<undefined> {
  isSuccess: true;
  payload: undefined;
}

interface ISignInApiResponseFailed extends ApiResponse<string> {
  isSuccess: false;
  payload: string;
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
        const errorMessage =
          error?.code === 401
            ? validationMessage.invalidLoginOrPassword
            : error.message;
        return {
          isSuccess: false,
          payload: errorMessage as string,
        };
      }
      return {
        isSuccess: false,
        payload: error.payload as string,
      };
    });
}
