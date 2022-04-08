import './address-book.css';
import Handlebars from 'handlebars';
import { v4 } from 'uuid';
import { addressBookTemplate } from './address-book.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { SearchBar } from '../search-bar/search-bar';
import { searchForUsers } from '../../business-logic/user/search-for-users';
import { IUser } from '../../lib/interfaces/user.interface';
import { Button } from '../button/button';
import { UserItemAction, UserList } from './user-list/user-list';

interface IChildren {
  appSearchBar: SearchBar;
  appSearchButton: Button;
  appUserList: Block;
}

export interface IAddressBookProps extends IComponentProps {
  children?: IChildren;
  title?: string;
  users?: IUser[];
  onConfirm?: () => void;
  onCancel?: () => void;
  action?: UserItemAction;
  actionName?: string;
}

const formId = `i${v4()}`;
const formSelector = `#${formId}`;
const template = Handlebars.compile(addressBookTemplate);

export class AddressBook extends Block<IAddressBookProps> {
  private _userNameSearchValue = '';

  private _childrenComponents: IChildren = {
    appSearchBar: new SearchBar({
      name: 'roster-search',
      placeholder: 'Поиск',
      classNames: ['address-book__search-bar'],
      internalEvents: {
        input: {
          input: () => this._handleUserNameChange(),
        },
      },
    }),
    appSearchButton: new Button({
      mode: 'primary',
      text: 'Искать',
      classNames: ['address-book__search-button'],
      submit: true,
    }),
    appUserList: getUserListComponent(
      this.props.users ?? [],
      this.props.action!,
      this.props.actionName!,
    ),
  };

  constructor(props: IAddressBookProps) {
    super('div', {
      ...props,
      classNames: ['address-book', ...(props.classNames ?? [])],
      internalEvents: {
        [formSelector]: {
          submit: (e) => this._handleSearchButtonClick(e),
        },
      },
    });
    this.setProps({
      children: this._childrenComponents,
    });
  }

  override render(): string {
    return template({ formId });
  }

  override componentDidUpdate(
    oldProps: IAddressBookProps,
    newProps: IAddressBookProps,
  ): boolean {
    if (oldProps === newProps) {
      return false;
    }
    this._childrenComponents.appUserList = getUserListComponent(
      newProps.users ?? [],
      this.props.action!,
      this.props.actionName!,
    );
    return oldProps.children?.appSearchBar !== newProps.children?.appSearchBar;
  }

  private _handleUserNameChange(): void {
    this._userNameSearchValue =
      this._childrenComponents.appSearchBar.getValue();
  }

  private _handleSearchButtonClick(e: SubmitEvent): void {
    e.preventDefault();
    if (this._userNameSearchValue) {
      searchForUsers(this._userNameSearchValue);
    }
  }
}

function getUserListComponent(
  users: IUser[],
  action: (user: IUser) => void,
  actionName: string,
): UserList {
  return new UserList({
    classNames: ['address-book__list'],
    users,
    action,
    actionName,
  });
}
