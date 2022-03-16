import { ChangeAvatarPage, IChangeAvatarPageProps } from './change-avatar-page';
import { connect, MapStateToProps } from '../../lib/store/connect';

const mapStateToProps: MapStateToProps<IChangeAvatarPageProps> = () => ({});

export default connect(mapStateToProps)(ChangeAvatarPage);
