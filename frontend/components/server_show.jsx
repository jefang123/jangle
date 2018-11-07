import React from 'react';
import { Link, Redirect, Switch, matchPath } from 'react-router-dom'
import ChannelShowContainer from './channel_show_container';
import ChannelCreateContainer from './channel_create_container';
import PrivateCreate from './channel_create_private_form';
import Modal from './modal';
import { ProtectedRoute } from '../util/route_util';
import { receiveChannel, receiveChannels } from '../actions/channel_actions';
import WelcomeShow from './welcome_show';
import { receiveMessage } from '../actions/message_actions';

class ServerShow extends React.PureComponent {
  constructor(props) {
    super(props)
    this.state = { 
      show: false,
    
     }
    this.showModal = this.showModal.bind(this)
    this.hideModal = this.hideModal.bind(this)
    this.handlePMClick = this.handlePMClick.bind(this)
  }

  showModal () {
    this.setState({ show: true });
  }
  
  hideModal () {
    this.setState({ show: false });
  }

  componentDidMount () {
    this.props.fetchServer(this.props.match.params.serverId);
    App.cable.subscriptions.create({
      channel: "MessageChannel",
      room: 'ChannelRoom'
    },    {

      received: (data) => {
        if(data.action === "typing") {
        }

        else if (data.action === "done") {
        }
        if(data.channels) {
          let parsedCh = {};
          data.channels.forEach(channel => {
            parsedCh[channel.id] = channel;
          })
          dispatch(receiveChannels(parsedCh))
        } 
        else if (data.channel_name) {
          dispatch(receiveChannel(data));
        }
        else if(data.body){
          dispatch(receiveMessage(data));
        }
      },

      typing: function(data) {
        return this.perform("typing", data)
      },

      done: function(data) {
        return this.perform("done", data)
      },

      speak: function(data) {
        return this.perform("speak", data)
      },

      speak2: function(data) {
        return this.perform("speak2", data)
      }
    })
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

  handlePMClick (e) {
    const mesagee = this.props.users[e.target.getAttribute("value")];
    this.props.createChannel({server_id: window.homeId, channel_name: mesagee.username});
    <Redirect to={`/server/${window.homeId}`}/>

  }

  handleRemoveClick (e) {
    e.preventDefault();
    this.props.removeServer(this.props.server.id);  
  }

  render() {
    if (this.props.redirect.includes("No Such Server")) {
      return (
        <Redirect to={`/server/${homeId}/welcome`} />
      );
  
  }
    let match = matchPath(this.props.history.location.pathname, {
      path: '/server/:serverId/channel/:channelId',
      exact: true,
      strict: false 
    });
    let parameter;
    if (!match) {
      parameter = 0;
    } else if (match.params.channelId) {
      parameter = parseInt(match.params.channelId);
    } else {
      parameter = 0;
    }
    
    let klass;

    if (!this.props.server) return null;
  
    const channels= this.props.channels.map( channel => {

      if (channel.id === parameter) {
        klass = "ch-selected"
      } else {
        klass = ""
      }

      let hash;
      let privateS = this.props.server.private;
      if (this.props.server.private) {
        hash = "@"
      } else {
        hash = "#"
      }

      let channelName;
      // if (privateS) {
        if (channel.channel_name === this.props.currentUser.username) {
          channelName = channel.channel_topic
        } 
      // }
      else {
        channelName = channel.channel_name
      }

      let channelb;
      if(this.props.server.creator_id === this.props.currentUser.id) {
        channelb = 
        <div className="delete-server" onClick={()=>{this.props.deleteChannel(channel.id)}}>
        X
        <div className="delete-hidden"><div className="arrow-left"></div>Delete Channel </div>
        </div>
      } 
      return (
        <Link key={channel.id} to={`/server/${this.props.server.id}/channel/${channel.id}`}>
          <li className={klass}>
            {hash} {channelName}
            {channelb}
          </li>
        </Link>
      )
    });
    const users = this.props.users.map(user => {
      if (this.props.server.creator_id === user.id ) {
        return (
          <p onClick={this.handlePMClick} value={user.id} key={user.id}><i className="fas fa-crown"></i> {user.username}</p>
        );
      } else {
        return (
          <p onClick={this.handlePMClick} value={user.id} key={user.id}>{user.username}</p>
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
      modalbutton = <button onClick={this.showModal} >New Private Message</button>
    }
    else if (this.props.currentUser.id === this.props.server.creator_id) {
      modalbutton = <button onClick={this.showModal} >Create Channel</button>
    }
    // <i className="fas fa-bars"></i>
    const { server } = this.props;

    if (this.props.server.private) {
      return (
        <div className="server-show">
          <section className='channel-index'>
            <section className='server-heading'>
              <h3>{server.server_name}</h3>
              <Modal show={this.state.show} handleClose={this.hideModal}>
                <div className="channel-create-modal">
                  <PrivateCreate handleClose={this.hideModal}/>
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
          <section className='home-show'>
          <Switch>
            <ProtectedRoute path='/server/:serverId/welcome' component={WelcomeShow} />
            <ProtectedRoute path='/server/:serverId/channel/:channelId' component={ChannelShowContainer} />
          </Switch>
          </section>
        </div>
      )
    } else {
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
        </div>
      )
    }

  
  }

}

export default ServerShow;
