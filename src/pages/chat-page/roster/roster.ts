import './roster.css';
import Handlebars from 'handlebars';
import { registerRosterItemComponent } from './roster-item';
import { Block } from '../../../lib/Block/Block';
import { SearchBar } from '../../../components/search-bar/search-bar';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { rosterTemplate } from './roster.tmpl';
import { Link } from '../../../components/link/link';

interface IChildren {
  appSearchBar: SearchBar;
  appLinkToAccountPage: Link;
}

interface IRosterProps extends IComponentProps {
  children?: IChildren;
  chats?: undefined[];
}

const template = Handlebars.compile(rosterTemplate);

export class Roster extends Block<IRosterProps> {
  private _childrenComponents: IChildren;

  constructor(children: IChildren, props?: IRosterProps) {
    super('aside', { classNames: ['roster', ...(props?.classNames ?? [])] });
    this._childrenComponents = children;
    this.setProps({
      children: this._childrenComponents,
      chats: props?.chats,
    });
    registerRosterItemComponent();
  }

  override render(): string {
    return template({ chats: this.props.chats });
  }
}
