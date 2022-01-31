import './navigation-page.css';
import Handlebars from 'handlebars';
import { Routes } from '../../constants/routes';
import { navigationPageTemplate } from './navigation-page.tmpl';
import { Block } from '../../lib/Block/Block';

interface INavigationPageProps {
  routes: string[];
}

const template = Handlebars.compile(navigationPageTemplate);

export class NavigationPage extends Block {
  constructor(rootId: string) {
    const routes: string[] = Object.values(Routes);
    super(
      'div',
      {
        routes,
      } as INavigationPageProps,
      rootId,
    );
  }

  render(): string {
    const { routes } = this.props as INavigationPageProps;
    return template({
      routes,
    });
  }
}
