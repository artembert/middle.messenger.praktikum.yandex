import { IAddressBookProps, AddressBook } from './address-book';
import { connect, MapStateToProps } from '../../lib/store/connect';

const mapStateToProps: MapStateToProps<IAddressBookProps> = (globalState) => ({
  users: [...globalState.users],
});

export default connect(mapStateToProps)(AddressBook);
