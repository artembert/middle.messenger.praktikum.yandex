import Handlebars from 'handlebars';
import { notFoundPageTemplate } from './404-page.tmpl';
import { Routes } from '../../constants/routes';

const chatsPageLink = `/${Routes.CHATS}`;

export function notFoundPage() {
  const template = Handlebars.compile(notFoundPageTemplate);
  return Promise.resolve(
    template({
      chatsPageLink,
    }),
  );
}
