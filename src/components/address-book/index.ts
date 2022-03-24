import { IAddressBookProps, AddressBook } from './address-book';
import { connect, MapStateToProps } from '../../lib/store/connect';

const mapStateToProps: MapStateToProps<IAddressBookProps> = () => ({});

export default connect(mapStateToProps)(AddressBook);
