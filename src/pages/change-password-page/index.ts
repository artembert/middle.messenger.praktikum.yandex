import {
  ChangePasswordPage,
  IChangePasswordPageProps,
} from './change-password-page';
import { connect, MapStateToProps } from '../../lib/store/connect';

const mapStateToProps: MapStateToProps<IChangePasswordPageProps> = () => ({});

export default connect(mapStateToProps)(ChangePasswordPage);
