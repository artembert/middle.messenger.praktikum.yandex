import { expect } from 'chai';
import { set } from './set';

describe('set', () => {
  it('should throw error if recipient is not of type object', () => {
    expect(() => set(3, 'foo.bar', 'baz')).to.throw(
      'target recipient must be an object',
    );
  });

  it('should throw error if path is not of type string', () => {
    expect(() => set({ key: 'value' }, {}, 'baz')).to.throw(
      'path must be a string',
    );
    expect(() => set({ key: 'value' }, null, 'baz')).to.throw(
      'path must be a string',
    );
  });

  it('should return valid object', () => {
    expect(set({ foo: 5 }, 'bar.baz', 10)).to.deep.eq({
      foo: 5,
      bar: { baz: 10 },
    });
    expect(
      set({ foo: 5, bar: { juice: 'orange', baz: 9 } }, 'bar.baz', 10),
    ).to.deep.eq({
      foo: 5,
      bar: { baz: 10 },
    });
  });

  it('should fill empty object with given properties', () => {
    expect(set({}, 'path.deep.into.objectFiled', 'rabbit')).to.deep.eq({
      path: {
        deep: {
          into: {
            objectFiled: 'rabbit',
          },
        },
      },
    });
  });

  it('should override existing property', () => {
    expect(set({ parent: { child: 'a' } }, 'parent.child', 9)).to.deep.eq({
      parent: { child: 9 },
    });
  });
});
