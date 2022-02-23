import { set } from './set';

describe('set', () => {
  test('should throw error if recipient is not of type object', () => {
    expect(() => set(3, 'foo.bar', 'baz')).toThrowError(
      'target recipient must be an object',
    );
  });

  test('should throw error if path is not of type string', () => {
    expect(() => set({ key: 'value' }, {}, 'baz')).toThrowError(
      'path must be a string',
    );
    expect(() => set({ key: 'value' }, null, 'baz')).toThrowError(
      'path must be a string',
    );
  });

  test('should return valid object', () => {
    expect(set({ foo: 5 }, 'bar.baz', 10)).toEqual({
      foo: 5,
      bar: { baz: 10 },
    });
    expect(
      set({ foo: 5, bar: { juice: 'orange', baz: 9 } }, 'bar.baz', 10),
    ).toEqual({
      foo: 5,
      bar: { juice: 'orange', baz: 10 },
    });
  });

  test('should fill empty object with given properties', () => {
    expect(set({}, 'path.deep.into.objectFiled', 'rabbit')).toEqual({
      path: {
        deep: {
          into: {
            objectFiled: 'rabbit',
          },
        },
      },
    });
  });

  test('should override existing property', () => {
    expect(set({ parent: { child: 'a' } }, 'parent.child', 9)).toEqual({
      parent: { child: 9 },
    });
  });
});
