import Handlebars from 'handlebars';
import { linkTemplate } from './link.tmpl';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

type Mode = 'primary' | 'secondary' | 'dangerous' | 'link' | 'icon';

export interface ILinkProps extends IComponentProps {
  mode: Mode;
  text: string;
  href: string;
}

const template = Handlebars.compile(linkTemplate);

export class Link extends Block {
  constructor(props: ILinkProps) {
    super('a', props);
  }

  override render(): string {
    return template(this.props);
  }
}
