import Handlebars from 'handlebars';
import { Routes } from '../../../constants/routes';
import { notFoundErrorPageTemplate } from './not-found-error-page.tmpl';
import { Block } from '../../../lib/Block/Block';
import { ILinkProps, Link } from '../../../components/link/link';

interface INotFoundErrorPageProps {
  linkToChats: Link;
}

const chatsPageLink = `/${Routes.CHATS}`;
const template = Handlebars.compile(notFoundErrorPageTemplate);

export class NotFoundErrorPage extends Block {
  constructor(rootId: string) {
    const linkToChatsProps: ILinkProps = {
      mode: 'link',
      text: 'Вернуться к чатам',
      href: chatsPageLink,
    };

    super(
      'div',
      {
        linkToChats: new Link(linkToChatsProps),
      } as INotFoundErrorPageProps,
      rootId,
    );
  }

  render(): string {
    const { linkToChats } = this.props as INotFoundErrorPageProps;
    return template({
      appLinkToChats: linkToChats.render(),
    });
  }
}
