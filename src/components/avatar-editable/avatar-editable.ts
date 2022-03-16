import './avatar-editable.css';
import Handlebars from 'handlebars';
import { avatarEditableTemplate } from './avatar-editable.tmpl';
import { Block } from '../../lib/Block/Block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

export interface IAvatarEditableProps extends IComponentProps {
  image?: string;
}

const template = Handlebars.compile(avatarEditableTemplate);

export class AvatarEditable extends Block<IAvatarEditableProps> {
  constructor(props: IAvatarEditableProps) {
    super('div', {
      ...props,
    });
  }

  override render(): string {
    return template(this.props);
  }
}
