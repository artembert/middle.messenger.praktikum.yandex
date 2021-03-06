import Handlebars from 'handlebars';
import { Routes } from '../../../constants/routes';
import { notFoundErrorPageTemplate } from './not-found-error-page.tmpl';
import { Block } from '../../../lib/block/block';
import { Link } from '../../../components';
import { getDocumentTitle } from '../../../presentation-logic/document-title';
import { inAppNavigation } from '../../../lib/router';

interface IChildren {
  appBackToChatLink: Link;
}

export interface INotFoundErrorPageProps {
  children?: IChildren;
}

const template = Handlebars.compile(notFoundErrorPageTemplate);

export class NotFoundErrorPage extends Block<INotFoundErrorPageProps> {
  private _childrenComponents: IChildren = {
    appBackToChatLink: new Link({
      mode: 'link',
      text: 'Вернуться к чатам',
      href: `..${Routes.CHATS}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.CHATS),
      },
    }),
  };

  constructor(props: INotFoundErrorPageProps, rootId: string) {
    super('div', props, rootId);
    this.setProps({
      children: this._childrenComponents,
    });
  }

  override componentDidMount() {
    super.componentDidMount();
    document.title = getDocumentTitle('Страница не найдена');
  }

  render(): string {
    return template({});
  }
}
