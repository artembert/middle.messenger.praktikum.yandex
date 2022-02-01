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

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super('div', {
      mode: props.mode ?? 'default',
      label: props.label,
      value: props.value,
      type: props.type ?? 'text',
      name: props.name,
      classNames: resolveClassNames(props.mode),
    });
  }

  override render(): string {
    const template = Handlebars.compile(inputTemplate);
    return template(this.props);
  }
}

function resolveClassNames(mode?: Mode): string[] {
  switch (mode) {
    case 'error':
      return ['input', 'input_mode_error'];
    case 'readonly':
      return ['input', 'input_mode_readonly'];
    case 'default':
      return ['input', 'input_mode_default'];
    default:
      return ['input', 'input_mode_default'];
  }
}
