import React from 'react';
import Splash from './splash';
import ServerIndexContainer from './server_index_container';
import { Redirect } from 'react-router-dom';

class Home extends React.Component {
  render () {
    if (this.props.currentUser) {
      return (
        <section>

          <ServerIndexContainer 
          currentUser ={ this.props.currentUser }
          logout = { this.props.logout }/>
          {/* <Redirect to={`/server/${window.homeId}`} /> */}
        </section>
      );} else {
        return (
          <Splash />
        )
      };
    }
  }


export default Home;

