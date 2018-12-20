import React from 'react';

class ChannelIndex extends React.PureComponent {
  constructor(props) {
    super(props)
  }

  render () {
    return (
      null
    )
  }
}

export default ChannelIndex;


const channels= this.props.channels.map( channel => {
  if (channel.id === parameter) {
    klass = "ch-selected"
  } else {
    klass = ""
  }

  let hash, channelName, channelb;
  if (server.private) {
    hash = "@";
    channelName = channel.channel_topic;
  } else {
    hash = "#";
    channelName = channel.channel_name;
  }

  if(server.creator_id === currentUser.id) {
    channelb = 
    <div className="delete-server" onClick={()=>{this.props.deleteChannel(channel.id)}}>
      <i className="fas fa-cog"></i>
    <div className="delete-hidden"><div className="arrow-left"></div>Delete Channel </div>
    </div>
  } 
  return (
    <Link key={channel.id} to={`/server/${server.id}/channel/${channel.id}`}>
      <li className={klass}>
        {hash} {channelName}
        {channelb}
      </li>
    </Link>
  )
});