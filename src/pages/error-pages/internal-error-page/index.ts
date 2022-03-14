import { connect, MapStateToProps } from '../../../lib/store/connect';
import {
  IInternalErrorPageProps,
  InternalErrorPage,
} from './internal-error-page';

const mapStateToProps: MapStateToProps<IInternalErrorPageProps> = () => ({});

export default connect(mapStateToProps)(InternalErrorPage);
