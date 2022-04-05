import { connect, MapStateToProps } from '../../../../lib/store/connect';
import { IMessageListProps, MessageList } from './message-list';

const mapStateToProps: MapStateToProps<IMessageListProps> = (globalState) => ({
  chatMessages: globalState.chatMessages,
  currentUserId: globalState.user?.id,
});

export default connect(mapStateToProps)(MessageList);
