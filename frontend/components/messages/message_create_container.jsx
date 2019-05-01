import MessageCreateForm from "./message_create_form";
import { connect } from 'react-redux';
import { createMessage } from '../../actions/message_actions';
import { withRouter } from 'react-router-dom'

const mapStateToProps = state => {
  return {
    errors: state.errors,
    currentUser: state.entities.users[state.session.currentUserId],
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: message => dispatch(createMessage(message))
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MessageCreateForm));
