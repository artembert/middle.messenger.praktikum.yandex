import { connect, MapStateToProps } from '../../lib/store/connect';
import { AccountPage, IAccountPageProps } from './account-page';

const mapStateToProps: MapStateToProps<IAccountPageProps> = (globalState) => ({
  storeValue: globalState.storeValue,
});

export default connect(mapStateToProps)(AccountPage);
