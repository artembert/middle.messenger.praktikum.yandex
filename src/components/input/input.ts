import './input.css';
import Handlebars from 'handlebars';
import { inputTemplate } from './input.tmpl';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import {
  InputValidationFn,
  IValidationResult,
} from '../../presentation-logic/forms/validate-input';

type Mode = 'default' | 'readonly' | 'error';

export interface IInputProps extends IComponentProps {
  name?: string;
  label?: string;
  error?: string;
  type?: 'text' | 'password';
  mode?: Mode;
  value?: string;
  validationFns?: InputValidationFn[];
}

const invalidClassName = 'input_mode_error';
const template = Handlebars.compile(inputTemplate);

export class Input extends Block<IInputProps> {
  constructor(props: IInputProps) {
    super('div', {
      mode: props.mode ?? 'default',
      label: props.label,
      value: props.value,
      type: props.type ?? 'text',
      name: props.name,
      classNames: resolveClassNames(props.mode),
      events: props.events ?? {},
      validationFns: props.validationFns ?? [],
      internalEvents: props.internalEvents ?? {},
    });

    if (this.props.mode === 'readonly') {
      this._getHtmlInputElement().disabled = true;
    }
  }

  override render(): string {
    return template(this.props);
  }

  public validate(): IValidationResult {
    const { validationFns = [] } = this.props;
    const inputValue = this.getValue();
    const validationResult: string[] = [];
    validationFns.forEach((validator) => {
      validationResult.push(validator(inputValue));
    });
    const errors = validationResult.filter((result) => !!result);
    return {
      isValid: !errors.length,
      errorMessage: errors[0],
    };
  }

  public setValidState(isValid: boolean): void {
    if (isValid) {
      this.props.classNames = this.props.classNames
        ? this.props.classNames.filter((name) => name !== invalidClassName)
        : [];
    } else {
      this.props.classNames = this.props.classNames
        ? [...this.props.classNames, invalidClassName]
        : [invalidClassName];
    }
  }

  public getValue(): string {
    return this._getHtmlInputElement().value;
  }

  private _getHtmlInputElement(): HTMLInputElement {
    const el = this.element;
    return el.getElementsByTagName('input')[0];
  }
}

function resolveClassNames(mode?: Mode): string[] {
  switch (mode) {
    case 'error':
      return ['input', invalidClassName];
    case 'readonly':
      return ['input', 'input_mode_readonly'];
    case 'default':
      return ['input', 'input_mode_default'];
    default:
      return ['input', 'input_mode_default'];
  }
}
