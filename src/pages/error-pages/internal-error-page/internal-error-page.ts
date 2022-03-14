import Handlebars from 'handlebars';
import { Routes } from '../../../constants/routes';
import { internalErrorPageTemplate } from './internal-error-page.tmpl';
import { Block } from '../../../lib/Block/Block';
import { ILinkProps, Link } from '../../../components/link/link';
import { getDocumentTitle } from '../../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../../lib/models/page.interface';
import { inAppNavigation } from '../../../lib/router/in-app-navigation';

interface IInternalErrorPageProps {
  linkToChats: Link;
}

const template = Handlebars.compile(internalErrorPageTemplate);

export class InternalErrorPage extends Block<IInternalErrorPageProps> {
  constructor({
    rootId,
    props,
  }: IPageConstructorParams<IInternalErrorPageProps>) {
    const linkToChatsProps: ILinkProps = {
      mode: 'link',
      text: 'Вернуться к чатам',
      href: `..${Routes.CHATS}`,
      click: (e: unknown) => inAppNavigation(e, Routes.CHATS),
    };

    super(
      'div',
      {
        ...props,
        linkToChats: new Link(linkToChatsProps),
      },
      rootId,
    );
  }

  override componentDidMount() {
    super.componentDidMount();
    document.title = getDocumentTitle('Внутренняя ошибка');
  }

  render(): string {
    const { linkToChats } = this.props;
    return template({
      appLinkToChats: linkToChats.render(),
    });
  }
}
