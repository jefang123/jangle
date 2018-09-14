import React from 'react';
import ServerIndexItem from './server_index_item';
import { Link } from 'react-router-dom';

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
    const servers = this.props.servers.map(server =>  <ServerIndexItem key={server.id} server={server} />);
    return(
      <div className="home-page">
        <section className="server-index">
          <ul>
            { servers }
            <li>
              <Link className="create-server" to='/'>+</Link>
            </li>
          </ul>
        </section>
        <section>
          Hello from ChannelIndex
            <div>
              <h2>Welcome Back, {this.props.currentUser.username}</h2>
              <button onClick={this.props.logout}>Log Out</button>
            </div>
        </section>
        <section>
          Hello from ChannelShow
        </section>
        <section>
          Hello from UserIndex
        </section>
      </div>
    );
  }
}

export default ServerIndex;