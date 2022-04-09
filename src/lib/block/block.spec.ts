import chai from 'chai';
import { JSDOM } from 'jsdom';
import { Block } from './block';

interface ITestBlockProps {
  value: string;
}

describe('Block component', () => {
  const defaultProps = { elementId: 'test', value: 'default-value' };

  beforeEach(() => {
    const dom = new JSDOM(
      '<!DOCTYPE html><head><title>JSDOM</title></head><body><div id="app"></div></body>',
      {
        url: 'http://localhost:3000',
      },
    );
    (global as any).window = dom.window;
    (global as any).document = dom.window.document;
    (global as any).window.scrollTo = () => {};
  });

  const createBlock = (options: ITestBlockProps = defaultProps) => {
    class Test extends Block<ITestBlockProps> {
      render() {
        return this.props.value;
      }
    }

    return new Test('div', options);
  };

  describe('init function', () => {
    it('render function should render current props', () => {
      const testBlock = createBlock();
      chai.expect(testBlock.getContent()).to.contains('default-value');
      testBlock.setProps({ value: 'new-value' });
      chai.expect(testBlock.getContent()).to.contains('new-value');
    });
  });
});
