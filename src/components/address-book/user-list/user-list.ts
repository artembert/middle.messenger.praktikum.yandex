import Handlebars from 'handlebars';
import { userListTemplate } from './user-list.tmpl';
import { IUser } from '../../../lib/interfaces/user.interface';
import { UserItem } from '../user-item/user-item';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { Block } from '../../../lib/block/block';

interface IChildren {
  [key: string]: UserItem;
}

export interface IUserListProps extends IComponentProps {
  children?: IChildren;
  users?: IUser[];
}

const template = Handlebars.compile(userListTemplate);

export class UserList extends Block<IUserListProps> {
  constructor(props: IUserListProps) {
    super('ul', { children: {}, ...props });
    this.setProps({
      users: props.users,
      children: getUserItemsFromUsers(props.chats ?? []),
    });
  }

  override render(): string {
    return template({ users: Object.keys(this.props.children ?? []) });
  }

  // eslint-disable-next-line class-methods-use-this
  override componentDidUpdate(
    oldProps: IUserListProps,
    newProps: IUserListProps,
  ): boolean {
    if (newProps.users && oldProps.users !== newProps.chats) {
      this.setProps({ children: {} });
      this.setProps({
        children: getUserItemsFromUsers(this.props.users ?? []),
      });
    }
    return newProps !== oldProps;
  }
}

function getUserItemsFromUsers(users: IUser[]): {
  [key: string]: UserItem;
} {
  return users.reduce((acc: { [key: string]: UserItem }, user, index) => {
    acc[`${UserItem.name}-${index}`] = new UserItem({
      user,
      classNames: ['user-item'],
    });

    return acc;
  }, {});
}
