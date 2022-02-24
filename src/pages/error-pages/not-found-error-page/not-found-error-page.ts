import Handlebars from 'handlebars';
import { Routes } from '../../../constants/routes';
import { notFoundErrorPageTemplate } from './not-found-error-page.tmpl';
import { Block } from '../../../lib/Block/Block';
import { ILinkProps, Link } from '../../../components/link/link';
import { getDocumentTitle } from '../../../presentation-logic/document-title';
import { IPageConstructorParams } from '../../../lib/models/page.interface';

interface INotFoundErrorPageProps {
  linkToChats: Link;
}

const chatsPageLink = `..${Routes.CHATS}`;
const template = Handlebars.compile(notFoundErrorPageTemplate);

export class NotFoundErrorPage extends Block<INotFoundErrorPageProps> {
  constructor({
    rootId,
    props,
  }: IPageConstructorParams<INotFoundErrorPageProps>) {
    const linkToChatsProps: ILinkProps = {
      mode: 'link',
      text: 'Вернуться к чатам',
      href: chatsPageLink,
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
    document.title = getDocumentTitle('Страница не найдена');
  }

  render(): string {
    const { linkToChats } = this.props;
    return template({
      appLinkToChats: linkToChats.render(),
    });
  }
}
