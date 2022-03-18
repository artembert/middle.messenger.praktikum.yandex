import Handlebars from 'handlebars';
import { buttonTemplate } from './button.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

type ButtonMode = 'primary' | 'secondary' | 'dangerous' | 'link' | 'icon';

export interface IButtonProps extends IComponentProps {
  text: string;
  mode: ButtonMode;
  submit?: boolean;
}

const template = Handlebars.compile(buttonTemplate);

export class Button extends Block<IButtonProps> {
  constructor(props: IButtonProps) {
    super('button', {
      ...props,
      attributes: resolveAttributes(props),
      classNames: resolveClassNames(props.mode),
    });
  }

  override render(): string {
    return template(this.props);
  }
}

function resolveAttributes(props: IButtonProps): Record<string, any> {
  return {
    type: props.submit ? 'submit' : 'button',
  };
}

function resolveClassNames(mode?: ButtonMode): string[] {
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
