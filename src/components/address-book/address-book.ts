import './address-book.css';
import Handlebars from 'handlebars';
import { addressBookTemplate } from './address-book.tmpl';
import { Block } from '../../lib/block/block';
import { IComponentProps } from '../../lib/interfaces/component-props.interface';
import { SearchBar } from '../search-bar/search-bar';
import { searchForUsers } from '../../business-logic/user/search-for-users';
import { IUser } from '../../lib/interfaces/user.interface';
import UserList from './user-list';

interface IChildren {
  appSearchBar: SearchBar;
  appUserList: Block;
}

export interface IAddressBookProps extends IComponentProps {
  children?: IChildren;
  title?: string;
  users?: IUser[];
  onConfirm?: () => void;
  onCancel?: () => void;
}

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
    appUserList: new UserList(
      {
        classNames: ['address-book__list'],
      },
      '',
    ),
  };

  constructor(props: IAddressBookProps) {
    super('div', {
      ...props,
      classNames: ['address-book', ...(props.classNames ?? [])],
    });
    this.setProps({
      children: this._childrenComponents,
    });
  }

  override render(): string {
    return template({});
  }

  private _handleUserNameChange(): void {
    this._userNameSearchValue =
      this._childrenComponents.appSearchBar.getValue();
    searchForUsers(this._userNameSearchValue);
  }
}
