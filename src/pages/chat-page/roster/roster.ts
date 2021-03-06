import './roster.css';
import Handlebars from 'handlebars';
import { Block } from '../../../lib/block/block';
import { Link, SearchBar } from '../../../components';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { rosterTemplate } from './roster.tmpl';
import { IChat } from '../../../lib/interfaces/chat';
import { CreateChat } from './create-chat/create-chat';
import { inAppNavigation } from '../../../lib/router';
import { Routes } from '../../../constants/routes';
import ChatsList from './chat-list';

interface IChildren {
  appSearchBar: SearchBar;
  appLinkToAccountPage?: Link;
  appChatsList: Block;
  appCreateChat: CreateChat;
}

export interface IRosterProps extends IComponentProps {
  children?: IChildren;
  currentChat?: IChat;
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
    appChatsList: new ChatsList({}, ''),
    appCreateChat: new CreateChat({
      classNames: ['roster__create-chat'],
    }),
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(props: IRosterProps, _: string) {
    super('aside', {
      ...props,
      classNames: ['roster', ...(props?.classNames ?? [])],
    });
    this.setProps({
      children: this._childrenComponents,
    });
  }

  override render(): string {
    return template({});
  }

  private _handleSearchBarChange(): void {
    this._rosterSearch = this._childrenComponents.appSearchBar.getValue();
  }
}
