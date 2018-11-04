import React from 'react';

class TypingUsers extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render () {
    if (!this.props.users)
      return null
    return (
    <></>
    )
  }
}

export default TypingUsers;
