import './user-item.css';
import Handlebars from 'handlebars';
import { rosterItemTemplate } from './user-item.tmpl';
import { IUser } from '../../../lib/interfaces/user.interface';
import { Avatar } from '../../avatar/avatar';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { Block } from '../../../lib/block/block';
import { Button } from '../../button/button';

interface IChildren {
  appAvatar?: Avatar;
  appAction?: Button;
}

interface IUserItemProps extends IComponentProps {
  children?: IChildren;
  user: IUser;
}

const template = Handlebars.compile(rosterItemTemplate);

export class UserItem extends Block<IUserItemProps> {
  constructor(props: IUserItemProps) {
    super('li', {
      ...props,
      classNames: ['user-item', ...(props.classNames ?? [])],
    });
    this.setProps({
      user: props.user,
      children: this._getChildrenComponents(),
    });
  }

  override render(): string {
    const { user } = this.props;
    return template({
      title: user.displayName,
      subtitle: `${user.firstName} ${user.secondName}`,
    });
  }

  private _getChildrenComponents(): IChildren {
    const { user, children } = this.props;
    return {
      ...children,
      appAvatar: new Avatar({
        image: user?.avatar,
        classNames: ['user-item__avatar'],
      }),
    };
  }
}
