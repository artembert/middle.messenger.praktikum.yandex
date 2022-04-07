import Handlebars from 'handlebars';
import { IChat } from '../../../../lib/interfaces/chat';
import { IComponentProps } from '../../../../lib/interfaces/component-props.interface';
import { chatsListTemplate } from './chats-list.tmpl';
import { Block } from '../../../../lib/block/block';
import { RosterItem } from '../roster-item/roster-item';

export interface IChatsListProps extends IComponentProps {
  children?: Record<string, RosterItem>;
  chats?: IChat[];
  currentChat?: IChat;
  rosterItems?: RosterItem[];
}

const template = Handlebars.compile(chatsListTemplate);

export class ChatsList extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super('ul', {
      ...props,
      classNames: ['roster__items-list'],
      children: getChatsListFromChats(props.chats ?? [], props.currentChat),
    });
  }

  override render(): string {
    return template({ rosterItems: Object.keys(this.props.children ?? []) });
  }

  protected override componentDidUpdate(
    oldProps: IChatsListProps,
    newProps: IChatsListProps,
  ): boolean {
    const didChatsChanged = newProps.chats && newProps.chats !== oldProps.chats;
    const didCurrentChatChanged =
      newProps.currentChat && newProps.currentChat !== oldProps.currentChat;
    if (didChatsChanged || didCurrentChatChanged) {
      this.setProps({
        children: getChatsListFromChats(
          this.props.chats ?? [],
          newProps.currentChat,
        ),
      });
      return true;
    }
    return false;
  }
}

function getChatsListFromChats(
  chats: IChat[],
  currentChat?: IChat,
): Record<string, RosterItem> {
  return chats.reduce((acc: Record<string, RosterItem>, chat, index) => {
    acc[`${RosterItem.name}-${index}`] = new RosterItem({
      chat,
      classNames:
        currentChat && currentChat.id === chat.id
          ? ['roster-item', 'roster-item_current']
          : ['roster-item'],
    });

    return acc;
  }, {});
}
