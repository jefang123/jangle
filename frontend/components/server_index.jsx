import React from 'react';
import ServerIndexItem from './server_index_item';

class ServerIndex extends React.Component {

  componentDidMount(){
    this.props.fetchServers();
  }

  componentWillUpdate(newProps) {
    if (this.props.match.params.currentUserId != newProps.match.params.currentUserId) {
      this.props.fetchServers()
    }
  }
  render(){ 
    let homeId;
    const home = this.props.servers.map(server => {
      if (server.server_name === 'Home') {
        homeId = server.id
        return <ServerIndexItem key={server.id} server={server} />
      }
    })
    const servers = this.props.servers.map(server => {
      if (server.id !== homeId) {
        return <ServerIndexItem 
        key={server.id} 
        server={server} 
        />
      }
    });
    return(
      <div className="home-page">
        <section className="server-index">
          <ul>
            { home }
            <div className="divider"></div>
            { servers }
            <li>
              <button className="create-server" >+</button>
           
            </li>
          </ul>
        </section>
        <div className="server-divider" />
        <section className='channel-index'>
              <p>Hello from ChannelIndex</p>
              <div className="divider" />
            <div>
              <h2>Welcome Back, {this.props.currentUser.username}</h2>
              <button onClick={this.props.logout}>Log Out</button>
            </div>
        </section>
        <div className="server-divider" />
        <section className='channel-show'>
         <p> Hello from ChannelShow </p>
         <div className="divider" />
        </section>
        <div className="server-divider" />
        <section className='user-index'>
          <p> Hello from UserIndex </p>
          <div className="divider" />
        </section>
      </div>
    );
  }
}

export default ServerIndex;