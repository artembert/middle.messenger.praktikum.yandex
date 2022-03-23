import { IChatProps, Chat } from './chat';
import { connect, MapStateToProps } from '../../../lib/store/connect';

const mapStateToProps: MapStateToProps<IChatProps> = () => ({});

export default connect(mapStateToProps)(Chat);
