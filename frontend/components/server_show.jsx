import React from 'react';
import { Link } from 'react-router-dom'
import { ProtectedRoute } from '../util/route_util';
import ChannelShowContainer from './channel_show_container';
import ChannelCreateContainer from './channel_create_container';
import Modal from './modal';

class ServerShow extends React.Component {
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

  componentDidMount () {
    this.props.fetchServer(this.props.match.params.serverId);
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params !== prevProps.match.params) {
      this.props.fetchServer(this.props.match.params.serverId)
    }
  }

  handleClick (e) {
    e.preventDefault();
    this.props.deleteServer(this.props.server.id);   
  }

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
            <span className="delete-hidden">Delete Server </span>
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
    const { server } = this.props;
    return (
      <div className="server-show">
        <section className='channel-index'>
          <section className='server-heading'>
            <h3>{server.server_name}</h3>
            <button onClick={this.handleClick.bind(this)}>Delete Server</button>
            <Modal show={this.state.show} handleClose={this.hideModal}>
              <ChannelCreateContainer handleClose={this.hideModal}/>
            </Modal>
            <br />
            <button onClick={this.showModal} >+</button>
          </section>
          <div className="divider" />
          <ul>
            {channels}
          </ul>
          <div className="divider" />
          <div className="user-tab">
              <h2>{this.props.currentUser.username}</h2>
              <button onClick={this.props.logout}>Log Out</button>
          </div>
    
        </section>
        <div className="server-divider" />
        <section className='channel-show'>
          <ProtectedRoute path='/server/:serverId/channel/:channelId' component={ChannelShowContainer} />
        </section>
        <div className="server-divider" />
        <section className='user-index'>
          <h3> Users </h3>
          <div className="divider" />
          <ul>

          {users}
          </ul>
        </section>
      </div>
    )
  }

}

export default ServerShow;

