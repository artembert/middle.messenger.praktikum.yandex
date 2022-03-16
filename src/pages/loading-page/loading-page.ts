import Handlebars from 'handlebars';
import { Block } from '../../lib/Block/Block';
import { loadingPageTemplate } from './loading-page.tmpl';
import { IPageConstructorParams } from '../../lib/models/page.interface';

interface IChildren {}

export interface ILoadingPageProps {
  children?: IChildren;
}

const template = Handlebars.compile(loadingPageTemplate);

export class LoadingPage extends Block<ILoadingPageProps> {
  private _childrenComponents: IChildren = {};

  constructor({ rootId, props }: IPageConstructorParams<ILoadingPageProps>) {
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
