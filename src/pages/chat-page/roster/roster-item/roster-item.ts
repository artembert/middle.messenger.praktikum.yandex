import './roster-item.css';
import Handlebars from 'handlebars';
import { IComponentProps } from '../../../../lib/interfaces/component-props.interface';
import { rosterItemTemplate } from './roster-item.tmpl';
import { Block } from '../../../../lib/block/block';
import { IChat } from '../../../../lib/interfaces/chat';
import { Avatar } from '../../../../components';
import { getChatName } from '../../../../presentation-logic/chat-name';
import { formatTime } from '../../../../presentation-logic/format-date';
import { chooseChat } from '../../../../business-logic/chats';

interface IChildren {
  appAvatar: Avatar;
}

interface IRosterItemProps extends IComponentProps {
  children?: IChildren;
  chat: IChat;
}

const template = Handlebars.compile(rosterItemTemplate);

export class RosterItem extends Block<IRosterItemProps> {
  constructor(props: IRosterItemProps) {
    super('li', props);
    this.setProps({
      chat: props.chat,
      children: this._getChildrenComponents(),
      internalEvents: {
        button: {
          click: () => this._handleClick(),
        },
      },
    });
  }

  override render(): string {
    const { chat } = this.props;
    return template({
      chat,
      title: getChatName(chat),
      message: chat.lastMessage?.content,
      time: chat.lastMessage?.time ? formatTime(chat.lastMessage.time) : '',
    });
  }

  private _getChildrenComponents(): IChildren {
    const { chat } = this.props;
    return {
      appAvatar: new Avatar({
        image: chat?.avatar,
        classNames: ['roster-item__avatar'],
      }),
    };
  }

  private _handleClick(): void {
    const { chat } = this.props;
    chooseChat(chat);
  }
}
