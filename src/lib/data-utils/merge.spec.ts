import { expect } from 'chai';
import { merge } from './merge';

describe('merge', () => {
  it('should deep merge properties from left and right objects', () => {
    expect(merge({ a: { b: { a: 2 } }, d: 5 }, { a: { b: { c: 1 } } })).to.eq({
      a: {
        b: {
          a: 2,
          c: 1,
        },
      },
      d: 5,
    });
    expect(merge({ a: { b: { a: 2 } }, d: 5 }, { a: 'value' })).to.eq({
      a: 'value',
      d: 5,
    });
  });
  it('should merge properties in given order', () => {
    expect(merge({ a: { b: { c: null } } }, { a: { b: { c: 1 } } })).to.eq({
      a: {
        b: {
          c: 1,
        },
      },
    });
    expect(merge({ a: { b: { c: 1 } } }, { a: { b: { c: null } } })).to.eq({
      a: {
        b: {
          c: null,
        },
      },
    });
  });
});
