import { IRosterProps, Roster } from './roster';
import { connect, MapStateToProps } from '../../../lib/store/connect';

const mapStateToProps: MapStateToProps<IRosterProps> = (globalState) => ({
  chats: [...globalState.chats],
  currentChat: globalState.currentChat ?? undefined,
});

export default connect(mapStateToProps)(Roster);
