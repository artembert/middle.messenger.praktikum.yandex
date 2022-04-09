import { Indexed } from '../interfaces/indexed.type';

export function merge(recipient: Indexed, donor: Indexed): Indexed {
  const result = recipient;
  Object.keys(donor).forEach((p) => {
    try {
      if (Array.isArray(donor[p])) {
        result[p] = donor[p];
      } else if (typeof donor[p] === 'object') {
        result[p] = merge(recipient[p] as Indexed, donor[p] as Indexed);
      } else {
        result[p] = donor[p];
      }
    } catch (e) {
      result[p] = donor[p];
    }
  });
  return recipient;
}
