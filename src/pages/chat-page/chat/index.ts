import { IChatProps, Chat } from './chat';
import { connect, MapStateToProps } from '../../../lib/store/connect';

const mapStateToProps: MapStateToProps<IChatProps> = (globalState) => ({
  currentChat: globalState.currentChat ?? undefined,
  userId: globalState.user?.id,
});

export default connect(mapStateToProps)(Chat);
