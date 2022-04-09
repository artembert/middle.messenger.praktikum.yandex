import './avatar.css';
import Handlebars from 'handlebars';
import { avatarTemplate } from './avatar.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';

export interface IAvatarProps extends IComponentProps {
  image?: string;
}

const template = Handlebars.compile(avatarTemplate);

export class Avatar extends Block<IAvatarProps> {
  constructor(props: IAvatarProps) {
    super('div', {
      ...props,
      classNames: ['avatar', ...(props.classNames ?? [])],
    });
  }

  override render(): string {
    const { image } = this.props;
    return template({ image });
  }
}
