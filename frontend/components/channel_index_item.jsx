import React from 'react';
import { Link, matchPath, withRouter } from 'react-router-dom';
import EditChannel from './channel_create_container';

class ChannelIndexItem extends React.PureComponent {
  constructor(props) {
    super(props);
    this.handleDeleteCh = this.handleDeleteCh.bind(this);
  }

  handleDeleteCh(id) {
    App.cable.subscriptions.subscriptions[0].delete({field:"channel", id});
  }

  render () {
    let { channel, server, currentUser, length } = this.props;

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

    if (channel.id === parameter) {
      klass = "ch-selected"
    } else {
      klass = ""
    }
  
    let hash, channelName, channelb;
    if (server.private) {
      hash = "@";
      if (channel.channel_name === currentUser.username) {
        channelName = channel.channel_topic;
      } else {
        channelName = channel.channel_name
      }
    } else {
      hash = "#";
      channelName = channel.channel_name;
    }
  
    if((server.creator_id === currentUser.id && length > 1) || server.private ) {
      channelb = 
      <div className="delete-server" onClick={()=>{this.handleDeleteCh(channel.id)}}>
        <i className="fas fa-cog"></i>
      <div className="delete-hidden"><div className="arrow-left"></div>Delete Conversation </div>
      </div>
    } 
    let editD;

    if (server.creator_id === currentUser.id && length > 1) {
      editD = <p onClick={()=>{this.handleDeleteCh(channel.id)}}>Delete Channel</p>;
    }
    
    let edit = 
    <div className="ch-dropdown">
      <p>Edit Channel</p>
      {editD}
    </div>

    if (server.private) {
      return (
        <Link key={channel.id} to={`/server/${server.id}/channel/${channel.id}`}>
          <li className={klass}>
            {hash} {channelName} 
            {channelb}
          </li>
        </Link>
      )
    } else {
      return (
        <Link key={channel.id} to={`/server/${server.id}/channel/${channel.id}`}>
          <li className={klass}>
            {hash} {channelName} 
            {edit}
          </li>
        </Link>
      )
    }
  }
}

export default withRouter(ChannelIndexItem);