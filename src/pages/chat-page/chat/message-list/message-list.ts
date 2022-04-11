import './message-list.css';
import Handlebars from 'handlebars';
import { IComponentProps } from '../../../../lib/interfaces/component-props.interface';
import { Block } from '../../../../lib/block/block';
import { IChatMessage } from '../../../../lib/interfaces/chat-message.interface';
import { ChatMessageItem } from './chat-message-item/chat-message-item';
import { messageListTemplate } from './message-list.tmpl';

export interface IMessageListProps extends IComponentProps {
  children?: Record<string, ChatMessageItem>;
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
    return template({ chatMessages: Object.keys(this.props.children ?? []) });
  }

  protected override componentDidUpdate(
    oldProps: IMessageListProps,
    newProps: IMessageListProps,
  ): boolean {
    if (
      newProps.chatMessages &&
      oldProps.chatMessages?.length === 0 &&
      newProps.chatMessages.length === 0
    ) {
      return false;
    }
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
      return true;
    }
    return false;
  }
}

function getChatMessageList(
  chatMessages: IChatMessage[],
  currentUserId: number | undefined,
): Record<string, ChatMessageItem> {
  return chatMessages
    .sort(
      (message1, message2) => message1.time.getTime() - message2.time.getTime(),
    )
    .reduce((acc: Record<string, ChatMessageItem>, chatMessage, index) => {
      acc[`${ChatMessageItem.name}-${index}`] = new ChatMessageItem({
        chatMessage,
        isCurrentUser: chatMessage.userId === currentUserId,
      });

      return acc;
    }, {});
}
