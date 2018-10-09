import ServerCreateForm from "./server_create_form";
import { connect } from 'react-redux';
import { createServer } from '../actions/server_actions';

const mapStateToProps = state => {
  return {
    errors: state.errors.server,
    currentUser: state.entities.users[state.session.currentUserId]
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: server => dispatch(createServer(server))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ServerCreateForm);
