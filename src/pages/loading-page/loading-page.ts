import Handlebars from 'handlebars';
import { Block } from '../../lib/block/block';
import { loadingPageTemplate } from './loading-page.tmpl';

interface IChildren {}

export interface ILoadingPageProps {
  children?: IChildren;
}

const template = Handlebars.compile(loadingPageTemplate);

export class LoadingPage extends Block<ILoadingPageProps> {
  private _childrenComponents: IChildren = {};

  constructor(props: ILoadingPageProps, rootId: string) {
    super('div', props, rootId);
    this.setProps({
      children: this._childrenComponents,
    });
  }

  override componentDidMount() {
    super.componentDidMount();
  }

  render(): string {
    return template({});
  }
}
