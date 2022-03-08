import { connect, MapStateToProps } from '../../lib/store/connect';
import { AccountPage, IAccountPageProps } from './account-page';
import { IUser } from '../../lib/interfaces/user.interface';

const mapStateToProps: MapStateToProps<IAccountPageProps> = (globalState) => ({
  fieldsValues: globalState.user as IUser,
});

export default connect(mapStateToProps)(AccountPage);
