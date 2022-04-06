import { Indexed } from '../interfaces/indexed.type';

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
  return { ...object, ...result } as T;
}
