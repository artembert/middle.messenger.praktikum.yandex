import Handlebars from 'handlebars';
import { buttonTemplate } from './button.tmpl';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

type ButtonMode = 'primary' | 'secondary' | 'dangerous' | 'link' | 'icon';

export interface IButtonProps extends IComponentProps {
  text: string;
  mode: ButtonMode;
  submit?: boolean;
}

export class Button extends Block {
  constructor(props: IButtonProps) {
    super('button', props);
  }

  override render(): string {
    const template = Handlebars.compile(buttonTemplate);
    return template(this.props);
  }
}
