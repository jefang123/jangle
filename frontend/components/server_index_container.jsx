import { connect } from 'react-redux';
import { fetchServers } from '../actions/server_actions';
import ServerIndex from './server_index';

const mapStateToProps = state => ({
  servers: Object.values(state.entities.servers)
});

const mapDispatchToProps = dispatch => ({
  fetchServers: () => dispatch(fetchServers())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ServerIndex);