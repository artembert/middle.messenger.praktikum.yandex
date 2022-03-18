import { IPage } from '../models/page.interface';
import { Block } from '../block/block';

interface IRouteProps {
  rootId: string;
}

export class Route {
  public readonly isPrivate: boolean;

  private readonly _pathname: string;

  private readonly _pageClass: IPage;

  private _page: Block | null = null;

  private _props: IRouteProps;

  constructor(
    pathname: string,
    pageClass: IPage,
    props: IRouteProps,
    isPrivate: boolean = false,
  ) {
    this._pathname = pathname;
    this._pageClass = pageClass;
    this._props = props;
    this.isPrivate = isPrivate;
  }

  render(): void {
    window.scrollTo(0, 0);
    if (this._pageClass) {
      this._page = new this._pageClass({
        rootId: this._props.rootId,
        props: {},
      });
      this._page.show();
    }
  }

  leave(): void {
    this._page?.leave();
  }

  match(pathname: string): boolean {
    return this._pathname === pathname;
  }
}
