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
}

const template = Handlebars.compile(chatsListTemplate);

export class ChatsList extends Block<IChatsListProps> {
  constructor(props: IChatsListProps) {
    super('ul', { children: {}, ...props });
    this.setProps({
      chats: props.chats,
      children: getChatsListFromChats(props.chats ?? []),
    });
  }

  override render(): string {
    return template({ chats: Object.keys(this.props.children ?? []) });
  }

  override componentDidMount() {
    super.componentDidMount();
  }
}

function getChatsListFromChats(
  chats: IChat[],
  activeChat?: IChat,
): {
  [key: string]: RosterItem;
} {
  return chats.reduce((acc: { [key: string]: RosterItem }, chat, index) => {
    acc[`${RosterItem.name}-${index}`] = new RosterItem({
      chat,
      classNames:
        activeChat && activeChat.id === chat.id
          ? ['roster-item  active-chat']
          : ['roster-item'],
    });

    return acc;
  }, {});
}
