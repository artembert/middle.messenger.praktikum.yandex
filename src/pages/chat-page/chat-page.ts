import './chat-page.css';
import Handlebars from 'handlebars';
import { chatPageTemplate } from './chat-page.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import Roster from './roster';
import { getDocumentTitle } from '../../presentation-logic/document-title';
import { getChats } from '../../business-logic/chats/get-chats';
import Chat from './chat';

interface IChildren {
  appRoster: Block;
  appChat: Block;
}

export interface IChatPageProps extends IComponentProps {
  children?: IChildren;
}

const template = Handlebars.compile(chatPageTemplate);

export class ChatPage extends Block<IChatPageProps> {
  private _childrenComponents: IChildren = {
    appRoster: new Roster({}, ''),
    appChat: new Chat({ classNames: ['chat-page__main'] }, ''),
  };

  constructor(props: IChatPageProps, rootId: string) {
    super('div', props, rootId);
    this.setProps({
      children: this._childrenComponents,
    });
  }

  override componentDidMount(): void {
    super.componentDidMount();
    document.title = getDocumentTitle('Чаты');
    getChats();
  }

  render(): string {
    return template({});
  }
}
