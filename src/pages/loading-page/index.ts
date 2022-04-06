import { ILoadingPageProps, LoadingPage } from './loading-page';
import { connect, MapStateToProps } from '../../lib/store/connect';

const mapStateToProps: MapStateToProps<ILoadingPageProps> = () => ({});

export default connect(mapStateToProps)(LoadingPage);
