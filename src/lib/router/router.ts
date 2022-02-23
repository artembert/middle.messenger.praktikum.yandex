import { Route } from './route';
import { IPage } from '../models/page.interface';

export class Router {
  private readonly _rootId: string;

  private _currentRoute: Route | undefined;

  private _routes: Route[] = [];

  private _history: History = window.history;

  constructor(rootId: string) {
    this._rootId = rootId;
  }

  use(path: string, page: IPage): Router {
    const route = new Route(path, page, { rootId: this._rootId });
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

  go(pathname: string): void {
    this._history.pushState({}, '', pathname);
    this._onRoute(pathname);
  }

  public back(): void {
    this._history.back();
  }

  public forward(): void {
    this._history.forward();
  }

  private _onRoute(pathname: string): void {
    const route = this._getRoute(pathname);
    if (!route) {
      return;
    }
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    this._currentRoute = route;
    route.render();
  }

  private _getRoute(path: string): Route | undefined {
    return this._routes.find((route) => route.match(path));
  }
}
