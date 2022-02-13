import { IPage } from '../models/page.interface';
import { Block } from '../Block/Block';

interface IRouteProps {
  rootId: string;
}

export class Route {
  private readonly _path: string;

  private readonly _pageClass: IPage;

  private _page: Block | null = null;

  private _props: IRouteProps;

  constructor(path: string, pageClass: IPage, props: IRouteProps) {
    this._path = path;
    this._pageClass = pageClass;
    this._props = props;
  }

  navigate(path: string): void {
    window.scrollTo(0, 0);
    if (this.match(path)) {
      this.render();
    }
  }

  leave(): void {
    this._page?.leave();
  }

  match(path: string): boolean {
    return this._path === path;
  }

  render(): void {
    if (this._pageClass) {
      this._page = new this._pageClass(this._props.rootId);
      this._page.show();
    }
  }
}
