import Handlebars from 'handlebars';
import { Routes } from '../../../constants/routes';
import { internalErrorPageTemplate } from './internal-error-page.tmpl';
import { Block } from '../../../lib/Block/Block';
import { Link } from '../../../components/link/link';
import { getDocumentTitle } from '../../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../../lib/models/page.interface';
import { inAppNavigation } from '../../../lib/router/in-app-navigation';

interface IChildren {
  appBackToChatLink: Link;
}

export interface IInternalErrorPageProps {
  children?: IChildren;
}

const template = Handlebars.compile(internalErrorPageTemplate);

export class InternalErrorPage extends Block<IInternalErrorPageProps> {
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

  constructor({
    rootId,
    props,
  }: IPageConstructorParams<IInternalErrorPageProps>) {
    super('div', props, rootId);
    this.setProps({
      children: this._childrenComponents,
    });
  }

  override componentDidMount() {
    super.componentDidMount();
    document.title = getDocumentTitle('Внутренняя ошибка');
  }

  render(): string {
    return template({});
  }
}
