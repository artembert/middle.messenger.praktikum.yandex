import { IPage } from '../models/page.interface';
import { Block } from '../Block/Block';

interface IRouteProps {
  rootId: string;
}

export class Route {
  private readonly _pathname: string;

  private readonly _pageClass: IPage;

  private _page: Block | null = null;

  private _props: IRouteProps;

  constructor(pathname: string, pageClass: IPage, props: IRouteProps) {
    this._pathname = pathname;
    this._pageClass = pageClass;
    this._props = props;
  }

  navigate(pathname: string): void {
    window.scrollTo(0, 0);
    if (this.match(pathname)) {
      this.render();
    }
  }

  leave(): void {
    this._page?.leave();
  }

  match(pathname: string): boolean {
    return this._pathname === pathname;
  }

  render(): void {
    if (this._pageClass) {
      this._page = new this._pageClass(this._props.rootId);
      this._page.show();
    }
  }
}
