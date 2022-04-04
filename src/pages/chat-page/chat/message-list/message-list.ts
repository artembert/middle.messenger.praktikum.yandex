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
}

const template = Handlebars.compile(messageListTemplate);

export class MessageList extends Block<IMessageListProps> {
  constructor(props: IMessageListProps) {
    console.log('props', props);
    super('ul', {
      ...props,
      children: getChatMessageList(props.chatMessages ?? []),
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
        children: getChatMessageList(this.props.chatMessages ?? []),
      });
      return super.componentDidUpdate(oldProps, newProps);
    }
    return false;
  }
}

function getChatMessageList(chatMessages: IChatMessage[]): {
  [key: string]: ChatMessageItem;
} {
  return chatMessages
    .sort(
      (message1, message2) => message1.time.getTime() - message2.time.getTime(),
    )
    .reduce((acc: { [key: string]: ChatMessageItem }, chatMessage, index) => {
      acc[`${ChatMessageItem.name}-${index}`] = new ChatMessageItem({
        chatMessage,
      });

      return acc;
    }, {});
}
