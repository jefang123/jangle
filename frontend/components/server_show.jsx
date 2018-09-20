import React from 'react';
import { Link } from 'react-router-dom'
import { Route } from 'react-router-dom';
import ChannelShowContainer from './channel_show_container';
import ChannelCreateContainer from './channel_create_container';
import Modal from './modal';

class ServerShow extends React.Component {
  constructor(props) {
    super(props)
    this.state = { 
      show: false,
      channel: {
        channel: {},
        messages: []
      }
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

  // updateAppStateChannel (newChannel) {
  //   this.setState({
  //     channel: {
  //       channel: newChannel.channel,
  //       messages: newChannel.messages
  //     }
  //   })
  // }
  

  render() {
    if (!this.props.server) return null;
    const channels= this.props.channels.map( channel => {
      return (
        <li key={channel.id}>
          <Link to={`/server/${this.props.server.id}/channel/${channel.id}`}>
            # {channel.channel_name} </Link>
          <Link to={`/server/${this.props.server.id}/channel/${channel.id}`}>
            <p className="delete-server" onClick={()=>{this.props.deleteChannel(channel.id)}}>
            X
            <span className="delete-hidden">Delete Channel </span>
            </p>
          </Link>
          
        </li>
      )
    });
    const users = this.props.users.map(user => {
      return (
        <p key={user.id}>{user.username}</p>
      );
    });

    let button;
    if (this.props.currentUser.id === this.props.server.creator_id) {
      button = <button onClick={this.handleClick.bind(this)}>Delete Server</button>
    } else {
      button = <button onClick={this.handleRemoveClick.bind(this)}>Remove Server</button>
    }

    const { server } = this.props;
      return (
        <div className="server-show">
          <section className='channel-index'>
            <section className='server-heading'>
              <h3>{server.server_name}</h3>
              {button}
              <Modal show={this.state.show} handleClose={this.hideModal}>
                <ChannelCreateContainer handleClose={this.hideModal}/>
              </Modal>
              <br />
              <button onClick={this.showModal} >+</button>
            </section>
            <ul>
              {channels}
            </ul>
            <div className="user-tab">
                <h2>{this.props.currentUser.username}</h2>
                <button onClick={this.props.logout}>Log Out</button>
            </div>
      
          </section>
          <section className='channel-show'>
            <Route path='/server/:serverId/channel/:channelId' render={(props)=>(
              < ChannelShowContainer 
                {...props}
                data-cableApp={this.props.cableApp}
                data-updateApp={this.updateAppStateChannel}
                data-ChannelData={this.state.channel}
                data-getChannelData={this.props.fetchChannel}
                ChannelData={this.state.channel}
              />
            )} /> 
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


// <ProtectedRoute path='/server/:serverId' render={(props)=>(
  //   < ServerShowContainer 
  //     {...props}
  //     data-cableApp={this.props.cableApp}
  //     data-updateApp={this.updateAppStateLine}
  //     data-serverData={this.state.serverData}
  //     data-getLServerData={this.getServerData}
  //     serverData={this.state.server}
  //     authData={this.state.auth}
  //   />
  // )} /> 

  // <ProtectedRoute path='/server/:serverId/channel/:channelId' component={ChannelShowContainer} />