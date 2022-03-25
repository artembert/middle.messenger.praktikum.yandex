import { IChatProps, Chat } from './chat';
import { connect, MapStateToProps } from '../../../lib/store/connect';

const mapStateToProps: MapStateToProps<IChatProps> = (globalState) => ({
  currentChat: structuredClone(globalState.currentChat) ?? undefined,
});

export default connect(mapStateToProps)(Chat);
