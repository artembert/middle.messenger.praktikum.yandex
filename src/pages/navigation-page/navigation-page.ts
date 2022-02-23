import './navigation-page.css';
import Handlebars from 'handlebars';
import { Routes } from '../../constants/routes';
import { navigationPageTemplate } from './navigation-page.tmpl';
import { Block } from '../../lib/Block/Block';
import { getDocumentTitle } from '../../presentation-logic/document-title';

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

  override componentDidMount() {
    super.componentDidMount();
    document.title = getDocumentTitle();
  }

  render(): string {
    const { routes } = this.props;
    return template({
      routes,
    });
  }
}
