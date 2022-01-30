import { Route } from './route';
import { IPage } from '../models/page.interface';

export class Router {
  private readonly _rootId: string;

  private _currentRoute: Route | undefined;

  private _routes: Route[] = [];

  constructor(rootId: string) {
    this._rootId = rootId;
  }

  use(path: string, page: IPage): Router {
    const route = new Route(path, page, { rootId: this._rootId });
    this._routes.push(route);

    return this;
  }

  start(): Router {
    window.addEventListener('hashchange', () => {
      this._onRoute(document.location.hash);
    });

    this._onRoute(document.location.hash);
    return this;
  }

  private _onRoute(path: string): void {
    if (this._currentRoute) {
      this._currentRoute.leave();
    }
    const route = this._getRoute(path);
    this._currentRoute = route;
    route?.render();
  }

  private _getRoute(path: string): Route | undefined {
    return this._routes.find((route) => route.match(path));
  }
}
