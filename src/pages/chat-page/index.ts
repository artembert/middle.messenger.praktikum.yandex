import { connect, MapStateToProps } from '../../lib/store/connect';
import { ChatPage, IChatPageProps } from './chat-page';

const mapStateToProps: MapStateToProps<IChatPageProps> = () => ({});

export default connect(mapStateToProps)(ChatPage);
