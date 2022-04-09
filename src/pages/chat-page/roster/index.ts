import { IRosterProps, Roster } from './roster';
import { connect, MapStateToProps } from '../../../lib/store/connect';

const mapStateToProps: MapStateToProps<IRosterProps> = (globalState) => ({
  currentChat: globalState.currentChat ?? undefined,
});

export default connect(mapStateToProps)(Roster);
