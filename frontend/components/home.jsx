import React from 'react';
import Splash from './splash';
import ServerIndexContainer from './server_index_container';

class Home extends React.PureComponent {
  render () {
    if (this.props.currentUser) {
      return (
        <section>

          <ServerIndexContainer 
          currentUser ={ this.props.currentUser }
          logout = { this.props.logout }/>
        </section>
      );} else {
        return (
          <Splash />
        )
      };
    }
  }


export default Home;

