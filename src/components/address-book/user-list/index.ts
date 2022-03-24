import { IUserListProps, UserList } from './user-list';
import { connect, MapStateToProps } from '../../../lib/store/connect';

const mapStateToProps: MapStateToProps<IUserListProps> = (globalState) => ({
  users: [...globalState.users],
});

export default connect(mapStateToProps)(UserList);
