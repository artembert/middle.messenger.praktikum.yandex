import { connect, MapStateToProps } from '../../lib/store/connect';
import { INavigationPageProps, NavigationPage } from './navigation-page';

const mapStateToProps: MapStateToProps<INavigationPageProps> = () => ({});

export default connect(mapStateToProps)(NavigationPage);
