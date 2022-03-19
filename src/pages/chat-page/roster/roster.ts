import './roster.css';
import Handlebars from 'handlebars';
import { Block } from '../../../lib/block/block';
import { SearchBar } from '../../../components/search-bar/search-bar';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { rosterTemplate } from './roster.tmpl';
import { Link } from '../../../components/link/link';
import { IChat } from '../../../lib/interfaces/chat';
import { Routes } from '../../../constants/routes';
import { inAppNavigation } from '../../../lib/router/in-app-navigation';
import { ChatsList } from './chat-list/chats-list';

interface IChildren {
  appSearchBar: SearchBar;
  appLinkToAccountPage?: Link;
  appChatsList: ChatsList;
}

export interface IRosterProps extends IComponentProps {
  children?: IChildren;
  chats?: IChat[];
}

const template = Handlebars.compile(rosterTemplate);

export class Roster extends Block<IRosterProps> {
  // @ts-ignore
  private _rosterSearch: string = '';

  private _childrenComponents: IChildren = {
    appSearchBar: new SearchBar({
      name: 'roster-search',
      placeholder: 'Поиск',
      internalEvents: {
        input: {
          input: () => this._handleSearchBarChange(),
        },
      },
    }),
    appLinkToAccountPage: new Link({
      mode: 'icon',
      text: '⚙️',
      href: `..${Routes.ACCOUNT}`,
      events: {
        click: (e: unknown) => inAppNavigation(e, Routes.ACCOUNT),
      },
    }),
    appChatsList: new ChatsList({
      classNames: ['roster__items-list'],
      chats: this.props.chats,
    }),
  };

  constructor(props: IRosterProps) {
    super('aside', { classNames: ['roster', ...(props?.classNames ?? [])] });
    this.setProps({
      children: this._childrenComponents,
      chats: props.chats,
    });
  }

  override render(): string {
    return template({});
  }

  private _handleSearchBarChange(): void {
    this._rosterSearch = this._childrenComponents.appSearchBar.getValue();
  }
}
