import React from 'react';
import ServerIndexItem from './Server_index_item';

class ServerIndex extends React.Component {

  componentDidMount(){
    this.props.fetchServers();
  }
  render(){
    const servers = this.props.servers.map(server =>  <ServerIndexItem key={server.id} server={server} />);
    return(
      <ul>
        { servers }
      </ul>
    );
  }
}

export default ServerIndex;