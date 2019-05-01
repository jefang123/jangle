import ServerCreateForm from "./server_create_form";
import { connect } from 'react-redux';
import { createServer } from '../../actions/server_actions';

const mapStateToProps = state => {
  return {
    errors: state.errors.server,
    currentUser: state.entities.users[state.session.currentUserId]
  };
};

export default connect(mapStateToProps, null)(ServerCreateForm);
