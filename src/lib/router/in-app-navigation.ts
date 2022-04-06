import { Router } from './router';

export function inAppNavigation(e: unknown, pathname: string): void {
  (e as Event).preventDefault();
  (e as Event).stopPropagation();
  const router = new Router();
  router.go(pathname);
}
