import { connect, MapStateToProps } from '../../../../lib/store/connect';
import { ChatsList, IChatsListProps } from './chats-list';

const mapStateToProps: MapStateToProps<IChatsListProps> = (globalState) => ({
  chats: globalState.chats,
  currentChat: globalState.currentChat ?? undefined,
});

export default connect(mapStateToProps)(ChatsList);
