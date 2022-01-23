import './navigation-page.css';

import Handlebars from 'handlebars';
import { Routes } from '../../constants/routes';
import { navigationPageTemplate } from './navigation-page.tmpl';

const routes = Object.values(Routes);

export function navigationPage() {
  const template = Handlebars.compile(navigationPageTemplate);
  return Promise.resolve(
    template({
      routes,
    }),
  );
}
