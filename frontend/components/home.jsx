import React from 'react';
import Splash from './splash';
import ServerIndexContainer from './server_index_container';
import { HashRouter } from 'react-router-dom';


class Home extends React.Component {
  render () {
    if (this.props.currentUser) {
      return (
        <HashRouter>

          <ServerIndexContainer 
          currentUser ={ this.props.currentUser }
          logout = { this.props.logout }/>
     
        </HashRouter>
      );} else {
        return (
          <Splash />
        )
      };
    }
  }


export default Home;

