import { Router } from './router';

export function inAppNavigation(e: unknown, pathname: string): void {
  const router = new Router();
  router.go(pathname);
  (e as Event).preventDefault();
  (e as Event).stopPropagation();
}
