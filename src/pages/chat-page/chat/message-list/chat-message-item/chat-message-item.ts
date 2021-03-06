import './chat-message-item.css';
import Handlebars from 'handlebars';
import { IChatMessage } from '../../../../../lib/interfaces/chat-message.interface';
import { IComponentProps } from '../../../../../lib/interfaces/component-props.interface';
import { chatMessageItemTemplate } from './chat-message-item.tmpl';
import { Block } from '../../../../../lib/block/block';

interface IChildren {}

interface IRosterItemProps extends IComponentProps {
  children?: IChildren;
  chatMessage: IChatMessage;
  isCurrentUser: boolean;
}

const template = Handlebars.compile(chatMessageItemTemplate);

export class ChatMessageItem extends Block<IRosterItemProps> {
  constructor(props: IRosterItemProps) {
    super('li', {
      ...props,
      classNames: props.isCurrentUser
        ? ['chat-message-item', 'chat-message-item_current-user']
        : ['chat-message-item'],
    });
    this.setProps({
      chatMessage: props.chatMessage,
    });
  }

  override render(): string {
    const { chatMessage } = this.props;
    return template({
      content: chatMessage.content,
      time: chatMessage.time.toLocaleTimeString(undefined, {
        hour: '2-digit',
        minute: '2-digit',
      }),
    });
  }
}
