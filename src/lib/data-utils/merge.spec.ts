import { merge } from './merge';

describe('merge', () => {
  test('should deep merge properties from left and right objects', () => {
    expect(merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } })).toEqual(
      {
        a: {
          b: {
            a: 2,
            c: 1,
          },
        },
        d: 5,
      },
    );
    expect(merge({ a: { b: { a: 2 } }, d: 5 }, { a: 'value' })).toEqual({
      a: 'value',
      d: 5,
    });
  });
  test('should merge properties in given order', () => {
    expect(merge({ a: { b: { c: null } } }, { a: { b: { c: 1 } } })).toEqual({
      a: {
        b: {
          c: 1,
        },
      },
    });
    expect(merge({ a: { b: { c: 1 } } }, { a: { b: { c: null } } })).toEqual({
      a: {
        b: {
          c: null,
        },
      },
    });
  });
});
