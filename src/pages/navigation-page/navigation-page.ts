import './navigation-page.css';
import Handlebars from 'handlebars';
import { Routes } from '../../constants/routes';
import { navigationPageTemplate } from './navigation-page.tmpl';
import { Block } from '../../lib/Block/Block';

interface INavigationPageProps {
  routes: string[];
}

const template = Handlebars.compile(navigationPageTemplate);

export class NavigationPage extends Block<INavigationPageProps> {
  constructor(rootId: string) {
    const routes: string[] = Object.values(Routes);
    super(
      'div',
      {
        routes,
      },
      rootId,
    );
  }

  render(): string {
    const { routes } = this.props;
    return template({
      routes,
    });
  }
}
