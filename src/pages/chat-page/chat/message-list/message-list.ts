import './message-list.css';
import Handlebars from 'handlebars';
import { IComponentProps } from '../../../../lib/interfaces/component-props.interface';
import { Block } from '../../../../lib/block/block';
import { IChatMessage } from '../../../../lib/interfaces/chat-message.interface';
import { ChatMessageItem } from './chat-message-item/chat-message-item';
import { messageListTemplate } from './message-list.tmpl';

interface IChildren {
  [key: string]: ChatMessageItem;
}

export interface IMessageListProps extends IComponentProps {
  children?: IChildren;
  chatMessages?: IChatMessage[];
  currentUserId?: number;
}

const template = Handlebars.compile(messageListTemplate);

export class MessageList extends Block<IMessageListProps> {
  constructor(props: IMessageListProps) {
    super('ul', {
      ...props,
      classNames: ['message-list'],
      children: getChatMessageList(
        props.chatMessages ?? [],
        props.currentUserId,
      ),
    });
  }

  override render(): string {
    console.log('render', Object.keys(this.props.children ?? []).length);
    return template({ chatMessages: Object.keys(this.props.children ?? []) });
  }

  protected override componentDidUpdate(
    oldProps: IMessageListProps,
    newProps: IMessageListProps,
  ): boolean {
    if (
      newProps.chatMessages &&
      oldProps.chatMessages !== newProps.chatMessages
    ) {
      this.setProps({
        children: getChatMessageList(
          this.props.chatMessages ?? [],
          this.props.currentUserId,
        ),
      });
      return super.componentDidUpdate(oldProps, newProps);
    }
    return false;
  }
}

function getChatMessageList(
  chatMessages: IChatMessage[],
  currentUserId: number | undefined,
): {
  [key: string]: ChatMessageItem;
} {
  console.log(currentUserId);
  return chatMessages
    .sort(
      (message1, message2) => message1.time.getTime() - message2.time.getTime(),
    )
    .reduce((acc: { [key: string]: ChatMessageItem }, chatMessage, index) => {
      acc[`${ChatMessageItem.name}-${index}`] = new ChatMessageItem({
        chatMessage,
        isCurrentUser: chatMessage.userId === currentUserId,
      });

      return acc;
    }, {});
}
