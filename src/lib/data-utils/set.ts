import { Indexed } from '../interfaces/indexed.type';
import { merge } from './merge';

export function set<T extends Indexed>(
  object: Indexed | unknown,
  path: unknown,
  value: unknown,
): T {
  if (typeof object !== 'object' || object === null) {
    throw new Error('target recipient must be an object');
  }

  if (typeof path !== 'string') {
    throw new Error('path must be a string');
  }

  const result = path.split('.').reduceRight<Indexed>(
    (acc, key) => ({
      [key]: acc,
    }),
    value as any,
  );
  return merge(object, result) as T;
}
