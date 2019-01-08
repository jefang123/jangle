import React from 'react';
import { connect } from 'react-redux';

class TypingUsers extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render () {
    const typers = this.props.typing[this.props.channelId];
    let text;
    
    if (!typers) {
      return null;
    }

    if (typers.length === 1) {
      text = `${typers[0]} is typing`;
    } else if (typers.length === 2) {
      text = `${typers[0]} and ${typers[1]} are typing`;
    } else if (typers.length > 2 && typers.length < 6) {
      text = `${typers[0]}, ${typers[1]} and ${typers.length - 2} others are typing`;
    } else if (typers.length > 5) {
      text = 'Several people are typing'
    }
    
    let klass = 'typing';
    if (!typers || typers.length === 0) {
      klass = 'hidden-typing';
    }

    return (
      <p className={klass}> {text} </p>
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
