import { DEFAULT_TITLE } from '../lib/router/router.config';

export function getDocumentTitle(title?: string): string {
  if (title) {
    return `${title} | ${DEFAULT_TITLE}`;
  }
  return DEFAULT_TITLE;
}
