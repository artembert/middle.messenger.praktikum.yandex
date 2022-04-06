import { RESOURCES_ENDPOINT } from '../constants/endpoints.constant';

export function resolveAvatarSrc(path?: string): string | undefined {
  return path ? `${RESOURCES_ENDPOINT}${path}` : undefined;
}
