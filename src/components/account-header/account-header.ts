import './account-header.css';
import Handlebars from 'handlebars';
import { accountHeaderTemplate } from './account-header.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { AvatarEditable } from '../avatar-editable/avatar-editable';

interface IChildren {
  appAvatarEditable: AvatarEditable;
}

export interface IAccountHeaderProps extends IComponentProps {
  title?: string;
  name?: string;
  value?: string;
  placeholder?: string;
  children?: IChildren;
}

const template = Handlebars.compile(accountHeaderTemplate);

export class AccountHeader extends Block<IAccountHeaderProps> {
  constructor(props: IAccountHeaderProps) {
    super('div', {
      ...props,
    });
  }

  override render(): string {
    const { title } = this.props;
    return template({ title });
  }
}
