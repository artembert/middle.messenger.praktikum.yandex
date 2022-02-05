import Handlebars from 'handlebars';
import { Routes } from '../../../constants/routes';
import { internalErrorPageTemplate } from './internal-error-page.tmpl';
import { Block } from '../../../lib/Block/Block';
import { ILinkProps, Link } from '../../../components/link/link';

interface IInternalErrorPageProps {
  linkToChats: Link;
}

const chatsPageLink = `/${Routes.CHATS}`;
const template = Handlebars.compile(internalErrorPageTemplate);

export class InternalErrorPage extends Block<IInternalErrorPageProps> {
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
      },
      rootId,
    );
  }

  render(): string {
    const { linkToChats } = this.props;
    return template({
      appLinkToChats: linkToChats.render(),
    });
  }
}