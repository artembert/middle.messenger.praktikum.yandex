import './navigation-page.css';
import Handlebars from 'handlebars';
import { Routes } from '../../constants/routes';
import { navigationPageTemplate } from './navigation-page.tmpl';
import { Block } from '../../lib/block/block';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../lib/models/page.interface';

interface INavigationPageProps {
  routes: string[];
}

const template = Handlebars.compile(navigationPageTemplate);

export class NavigationPage extends Block<INavigationPageProps> {
  constructor({ rootId, props }: IPageConstructorParams<INavigationPageProps>) {
    const routes: string[] = Object.values(Routes);
    super(
      'div',
      {
        ...props,
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
