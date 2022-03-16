import { IPage } from '../models/page.interface';
import { Block } from '../Block/Block';
import { checkAuthorization } from '../../business-logic/auth/check-authorization';

interface IRouteProps {
  rootId: string;
}

export class Route {
  private readonly _pathname: string;

  private readonly _pageClass: IPage;

  private readonly _isPrivate: boolean;

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
    this._isPrivate = isPrivate;
  }

  async navigate(): Promise<{ isSuccess: boolean }> {
    if (this._isPrivate) {
      const { isSuccess: isAuthorized } = await checkAuthorization();
      if (isAuthorized) {
        this._render();
        return { isSuccess: true };
      }
      return { isSuccess: false };
    }
    this._render();
    return { isSuccess: true };
  }

  leave(): void {
    this._page?.leave();
  }

  match(pathname: string): boolean {
    return this._pathname === pathname;
  }

  private _render(): void {
    window.scrollTo(0, 0);
    if (this._pageClass) {
      this._page = new this._pageClass({
        rootId: this._props.rootId,
        props: {},
      });
      this._page.show();
    }
  }
}
