import Handlebars from 'handlebars';
import { userListTemplate } from './user-list.tmpl';
import { IUser } from '../../../lib/interfaces/user.interface';
import { UserItem } from '../user-item/user-item';
import { IComponentProps } from '../../../lib/interfaces/component-props.interface';
import { Block } from '../../../lib/block/block';
import { Button } from '../../button/button';

export type UserItemAction = (user: IUser) => void;

export interface IUserListProps extends IComponentProps {
  children?: Record<string, UserItem>;
  users?: IUser[];
  action: UserItemAction;
  actionName: string;
}

const template = Handlebars.compile(userListTemplate);

export class UserList extends Block<IUserListProps> {
  constructor(props: IUserListProps) {
    super('ul', {
      ...props,
      users: props.users,
      children: getUserItemsFromUsers(
        props.users ?? [],
        props.action,
        props.actionName,
      ),
    });
  }

  override render(): string {
    return template({ users: Object.keys(this.props.children ?? []) });
  }
}

function getUserItemsFromUsers(
  users: IUser[],
  action: UserItemAction,
  actionName: string,
): Record<string, UserItem> {
  return users.reduce((acc: Record<string, UserItem>, user, index) => {
    acc[`${UserItem.name}-${index}`] = new UserItem({
      user,
      classNames: ['user-item'],
      children: {
        appAction: new Button({
          classNames: ['user-item__action'],
          mode: 'icon',
          text: actionName,
          events: {
            click: () => action(user),
          },
        }),
      },
    });

    return acc;
  }, {});
}
