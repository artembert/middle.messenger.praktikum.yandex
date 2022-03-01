import { connect, MapStateToProps } from '../../lib/store/connect';
import { ISignInPageProps, SignInPage } from './sign-in-page';

const mapStateToProps: MapStateToProps<ISignInPageProps> = () => ({});

export default connect(mapStateToProps)(SignInPage);
