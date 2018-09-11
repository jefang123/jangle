import SessionForm from "./session_form";
import { connect } from 'react-redux';
import { signup } from '../actions/session_actions';

const mapStateToProps = state => {
  return {
    errors: state.errors ,
    currentUser: state.entities.users[state.session.currentUserId],
    formType: 'signup'
  };
};

const mapDispatchToProps = dispatch => {
  return {
    processForm: user => dispatch(signup(user))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionForm);
