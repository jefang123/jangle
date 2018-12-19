import React from 'react';
import { matchPath, Redirect } from 'react-router-dom';
import ServerIndexItem from './server_index_item';
import ServerCreateForm from './server_create_container';
import Modal from './modal';
import JoinServerForm from './join_server_form';
import ServerLoad from './server_index_loading';

class ServerIndex extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { show: false }
   
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal () {
    this.setState({ show: true });
  }
  
  hideModal () {
    this.setState({ show: false });
  }
    
  componentDidMount(){
    this.props.fetchServers();
  }

  render(){ 
 
    if (!this.props.servers || this.props.servers.length === 0) {
      return (
        <>
          <ServerLoad />
        </>
      );
    }

    let currentServers = this.props.servers.filter(server => {
      if (server.user_ids) {
        return server.user_ids.includes(this.props.currentUser.id)
      }
    })

    let filteredServers = currentServers.filter(server => {
      return server.id !== window.homeId
    })
    let firstServer = filteredServers[0];

  
    const home = currentServers.map(server => {
      if (server.private) {
        window.homeId = server.id;
        return <ServerIndexItem key={server.id} server={server} />
      }
    })
    const servers = currentServers.map(server => {
      if (!server.private) {
        return <ServerIndexItem 
        key={server.id} 
        server={server} 
        />
      }
    });
    let match = matchPath(this.props.history.location.pathname, {
      path: '/server/:serverId/',
      exact: false,
      strict: false 
    });

    if (!match) {
      return(
        <Redirect to={`/server/${firstServer.id}`}/>
      )
    } else {
      return(
          <section className="server-index">
            <ul>
              { home }
              <div className="divider"></div>
              { servers }
              <li>
                <Modal show={this.state.show} handleClose={this.hideModal}>
                  <div className="create-server-modal">
                    <ServerCreateForm handleClose={this.hideModal} />
                    <JoinServerForm 
                      // servers={this.props.servers}
                      handleClose={this.hideModal} 
                      currentUser={this.props.currentUser}
                    />
                  </div>
                </Modal>
                <button onClick={this.showModal} className="create-server" >+</button>
              </li>
            </ul>
          </section>
      );
    }
  }
}

export default ServerIndex;
