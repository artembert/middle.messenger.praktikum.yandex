import {
  INotFoundErrorPageProps,
  NotFoundErrorPage,
} from './not-found-error-page';
import { connect, MapStateToProps } from '../../../lib/store/connect';

const mapStateToProps: MapStateToProps<INotFoundErrorPageProps> = () => ({});

export default connect(mapStateToProps)(NotFoundErrorPage);
