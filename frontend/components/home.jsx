import React from 'react';
import Splash from './splash';
import ServerIndexContainer from './server_index_container';

class Home extends React.PureComponent {
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


export default Home;

