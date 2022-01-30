import './input.css';
import Handlebars from 'handlebars';
import { inputTemplate } from './input.tmpl';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

type Mode = 'default' | 'readonly' | 'error';

export interface IInputProps extends IComponentProps {
  name: string;
  label: string;
  error?: string;
  type?: 'text' | 'password';
  mode?: Mode;
  value?: string;
}

export class Input extends Block {
  constructor(props: IInputProps) {
    const className = resolveClassNames(props.mode);
    super('div', {
      ...props,
      type: props.type ?? 'text',
      className,
    });
  }

  override render(): string {
    const template = Handlebars.compile(inputTemplate);
    return template(this.props);
  }
}

function resolveClassNames(mode?: Mode): string {
  switch (mode) {
    case 'error':
      return 'input input_mode_error';
    case 'readonly':
      return 'input input_mode_readonly';
    case 'default':
      return 'input input_mode_default';
    default:
      return 'input input_mode_default';
  }
}
