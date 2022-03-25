import './roster.css';
import Handlebars from 'handlebars';
import { Block } from '../../../lib/block/block';
import { SearchBar } from '../../../components/search-bar/search-bar';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { rosterTemplate } from './roster.tmpl';
import { Link } from '../../../components/link/link';
import { IChat } from '../../../lib/interfaces/chat';
import { CreateChat } from './сreate-chat/create-chat';
import { inAppNavigation } from '../../../lib/router/in-app-navigation';
import { Routes } from '../../../constants/routes';
import { ChatsList } from './chat-list/chats-list';

interface IChildren {
  appSearchBar: SearchBar;
  appLinkToAccountPage?: Link;
  appChatsList: ChatsList;
  appCreateChat: CreateChat;
}

export interface IRosterProps extends IComponentProps {
  children?: IChildren;
  chats?: IChat[];
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
    appChatsList: new ChatsList({
      classNames: ['roster__items-list'],
      chats: this.props.chats,
      currentChat: this.props.currentChat,
    }),
    appCreateChat: new CreateChat({
      classNames: ['roster__create-chat'],
    }),
  };

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  constructor(props: IRosterProps, _: string) {
    super('aside', { classNames: ['roster', ...(props?.classNames ?? [])] });
    this.setProps({
      children: this._childrenComponents,
      chats: props.chats,
    });
  }

  override componentDidUpdate(
    oldProps: IRosterProps,
    newProps: IRosterProps,
  ): boolean {
    if (newProps.chats && oldProps.chats !== newProps.chats) {
      this.setProps({
        children: {
          appCreateChat: this._childrenComponents.appCreateChat,
          appLinkToAccountPage: this._childrenComponents.appLinkToAccountPage,
          appSearchBar: this._childrenComponents.appSearchBar,
          appChatsList: new ChatsList({
            classNames: ['roster__items-list'],
            chats: this.props.chats,
            currentChat: this.props.currentChat,
          }),
        },
      });
    }
    return newProps !== oldProps;
  }

  override render(): string {
    return template({});
  }

  private _handleSearchBarChange(): void {
    this._rosterSearch = this._childrenComponents.appSearchBar.getValue();
  }
}
