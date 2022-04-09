const DEFAULT_TITLE = 'Мессенджер';

export function getDocumentTitle(title?: string): string {
  if (title) {
    return `${title} | ${DEFAULT_TITLE}`;
  }
  return DEFAULT_TITLE;
}
