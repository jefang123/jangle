import React from 'react';
import { Link } from 'react-router-dom'
import ChannelShowContainer from './channel_show_container';
import ChannelCreateContainer from './channel_create_container';
import Modal from './modal';
import { ProtectedRoute } from '../util/route_util';

class ServerShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      show: false,
    
     }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
  }

  showModal () {
    this.setState({ show: true });
  }
  
  hideModal () {
    this.setState({ show: false });
  }

  componentDidMount () {
    this.props.fetchServer(this.props.match.params.serverId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.serverId !== prevProps.match.params.serverId) {
      this.props.fetchServer(this.props.match.params.serverId)
    }
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteServer(this.props.server.id);   
  }

  handleRemoveClick (e) {
    e.preventDefault();
    this.props.removeServer(this.props.server.id);   
  }

  render() {
  
    if (!this.props.server) return null;
    const channels= this.props.channels.map( channel => {
      let channelb;
      if(this.props.server.creator_id === this.props.currentUser.id) {
        channelb = <Link to={`/server/${this.props.server.id}/channel/${channel.id}`}>
        <p className="delete-server" onClick={()=>{this.props.deleteChannel(channel.id)}}>
        X
        <span className="delete-hidden">Delete Channel </span>
        </p>
      </Link>
      } 
      return (
        <li key={channel.id}>
          <Link to={`/server/${this.props.server.id}/channel/${channel.id}`}>
            # {channel.channel_name} </Link>
          {channelb}
          
        </li>
      )
    });
    const users = this.props.users.map(user => {
      if (this.props.server.creator_id === user.id ) {
        return (
          <p key={user.id}><i className="fas fa-crown"></i> {user.username}</p>
        );
      } else {
        return (
          <p key={user.id}>{user.username}</p>
        );
      }
    });

    let button;
    if (this.props.server.private) {
      button;
    }
    else if (this.props.currentUser.id === this.props.server.creator_id) {
      button = <button onClick={this.handleClick.bind(this)}>Delete Server</button>
    } else {
      button = <button onClick={this.handleRemoveClick.bind(this)}>Remove Server</button>
    }
    
    let modalbutton;
    if (this.props.server.private) {
      modalbutton;
    }
    else if (this.props.currentUser.id === this.props.server.creator_id) {
      modalbutton = <button onClick={this.showModal} >Create Channel</button>
    }
    // <i className="fas fa-bars"></i>
    const { server } = this.props;

      return (
        <div className="server-show">
          <section className='channel-index'>
            <section className='server-heading'>
              <h3>{server.server_name}</h3>
              {button}
              <Modal show={this.state.show} handleClose={this.hideModal}>
                <div className="channel-create-modal">
                  <ChannelCreateContainer handleClose={this.hideModal}/>
                </div>
              </Modal>
              <br />
              {modalbutton}
            </section>
            <ul>
              {channels}
            </ul>
            <div className="user-tab">
                <div>

                <img src={window.logo_url}></img>
                </div>
                <section>
                  <p>{this.props.currentUser.username}</p>
                  <p># {this.props.currentUser.id}</p>
                </section>
                <button onClick={this.props.logout}>Log Out</button>
            </div>
      
          </section>
          <section className='channel-show'>
          <ProtectedRoute path='/server/:serverId/channel/:channelId' component={ChannelShowContainer} />
          </section>
          <section className='user-index'>
            <h3> Users </h3>
            <div className="divider" />
            <ul>

            {users}
            </ul>
          </section>
          {/* <ServerWebSocket
            data-cableApp={this.props['data-cableApp']}
            data-updateApp={this.props['data-updateApp']}
            data-ServerData={this.props.server}
            data-getServerData={this.props['data-getServerData']}
          /> */}
        </div>
      )
  
  }

}

export default ServerShow;
