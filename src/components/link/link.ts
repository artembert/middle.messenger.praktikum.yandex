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
    super('a', {
      ...props,
      attributes: resolveAttributes(props),
      classNames: resolveClassNames(props.mode),
    });
  }

  override render(): string {
    return template(this.props);
  }
}

function resolveAttributes(props: ILinkProps): Record<string, any> {
  return {
    href: props.href,
  };
}

function resolveClassNames(mode?: Mode): string[] {
  switch (mode) {
    case 'primary':
      return ['button', 'button_mode_primary'];
    case 'secondary':
      return ['button', 'button_mode_secondary'];
    case 'link':
      return ['button', 'button_mode_link'];
    case 'dangerous':
      return ['button', 'button_mode_dangerous'];
    case 'icon':
      return ['button', 'button_mode_icon'];
    default:
      return ['button', 'button_mode_primary'];
  }
}
