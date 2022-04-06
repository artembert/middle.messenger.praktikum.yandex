import { connect, MapStateToProps } from '../../lib/store/connect';
import { IRegisterPageProps, RegisterPage } from './register-page';

const mapStateToProps: MapStateToProps<IRegisterPageProps> = (globalState) => ({
  fieldsValue: globalState.initialNewUser,
});

export default connect(mapStateToProps)(RegisterPage);
