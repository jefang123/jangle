import React from 'react';
import { connect } from 'react-redux';

class TypingUsers extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render () {

    
    return (
      <p> {this.props.typing[6]} </p>
    )
  }
}

const mapStateToProps = state => ({
  typing: state.entities.typing,
  currentUser: state.entities.users[state.session.currentUserId]
});

export default connect(
  mapStateToProps
)(TypingUsers);
