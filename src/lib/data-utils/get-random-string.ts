import { v4 } from 'uuid';

export function getRandomString(length: number = 6): string {
  if (length > 32) {
    throw new Error('Provide length equal or smaller then 32 symbols');
  }
  return v4().replace(/-/g, '').substr(0, length);
}
