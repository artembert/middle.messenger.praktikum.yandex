import { connect, MapStateToProps } from '../../lib/store/connect';
import { IUser } from '../../lib/interfaces/user.interface';
import { EditAccountPage, IEditAccountPageProps } from './edit-account-page';

const mapStateToProps: MapStateToProps<IEditAccountPageProps> = (
  globalState,
) => ({
  fieldsValues: globalState.user as IUser,
});

export default connect(mapStateToProps)(EditAccountPage);
