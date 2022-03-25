import Handlebars from 'handlebars';
import { IChat } from '../../../../lib/interfaces/chat';
import { IComponentProps } from '../../../../lib/interfaces/component-props.interface';
import { chatsListTemplate } from './chats-list.tmpl';
import { Block } from '../../../../lib/block/block';
import { RosterItem } from '../roster-item/roster-item';

interface IChildren {
  [key: string]: RosterItem;
}

interface IChatsListProps extends IComponentProps {
  children?: IChildren;
  chats?: IChat[];
  currentChat?: IChat;
}

const template = Handlebars.compile(chatsListTemplate);

export class ChatsList extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super('ul', {
      ...props,
      children: getChatsListFromChats(props.chats ?? [], props.currentChat),
    });
  }

  override render(): string {
    return template({ chats: Object.keys(this.props.children ?? []) });
  }
}

function getChatsListFromChats(
  chats: IChat[],
  currentChat?: IChat,
): {
  [key: string]: RosterItem;
} {
  return chats.reduce((acc: { [key: string]: RosterItem }, chat, index) => {
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
