import { Route } from './route';
import { IPage } from '../models/page.interface';
import { Routes } from '../../constants/routes';
import { checkAuthorization } from '../../business-logic/auth';

export class Router {
  static instance: Router;

  private readonly _rootId!: string;

  private _currentRoute: Route | undefined;

  private _routes: Route[] = [];

  private _history: History = window.history;

  private _loader: Route | undefined;

  constructor(rootId?: string) {
    if (Router.instance) {
      // eslint-disable-next-line no-constructor-return
      return Router.instance;
    }
    if (!rootId) {
      throw new Error('rootId is not provided');
    }
    this._rootId = rootId;
    Router.instance = this;
  }

  use(path: string, page: IPage, isPrivate: boolean = false): Router {
    const route = new Route(path, page, { rootId: this._rootId }, isPrivate);
    this._routes.push(route);
    return this;
  }

  start(): Router {
    window.addEventListener('popstate', () => {
      this._onRoute(document.location.pathname);
    });

    this._onRoute(document.location.pathname);
    return this;
  }

  go(pathname: string): Promise<void> {
    this._history.pushState({}, '', pathname);
    return this._onRoute(pathname);
  }

  setLoader(loader: IPage): Router {
    this._loader = new Route('', loader, { rootId: this._rootId });
    return this;
  }

  back(): void {
    this._history.back();
  }

  forward(): void {
    this._history.forward();
  }

  private async _onRoute(pathname: string): Promise<void> {
    const route = this._getRoute(pathname);
    if (!route) {
      this.go(Routes.NOT_FOUND);
      throw new Error(`Route ${pathname} does not exists`);
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    if (!this._currentRoute.isPrivate) {
      return route.render();
    }
    if (this._loader) {
      this._loader.render();
    }
    const { isSuccess: isAuthorized } = await checkAuthorization();
    if (isAuthorized) {
      return route.render();
    }
    return this.go(Routes.SIGN_IN);
  }

  private _getRoute(path: string): Route | undefined {
    return this._routes.find((route) => route.match(path));
  }
}
