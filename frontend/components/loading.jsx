import React from 'react';

class Loading extends React.PureComponent {
  render () {
    if (this.props.currentUser) {
      return (
          <ServerIndexContainer />
      );} else {
        return (
          <Splash />
        )
      };
    }
  }


export default Loading;