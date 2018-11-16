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
    debugger
    if (this.props.servers.length === 0) {
      return (
        <>
          <ServerLoad />
        </>
      );
    }
    const home = this.props.servers.map(server => {
      if (server.private) {
        window.homeId = server.id;
        return <ServerIndexItem key={server.id} server={server} />
      }
    })
    const servers = this.props.servers.map(server => {
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
        <Redirect to={`/server/${window.homeId}/welcome`}/>
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
                    <JoinServerForm handleClose={this.hideModal} />
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
