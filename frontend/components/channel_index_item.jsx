import React from 'react';
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
  channelb = <Link to={`/server/${this.props.server.id}/channel/${channel.id}`}>
  <div className="delete-server" onClick={()=>{this.props.deleteChannel(channel.id)}}>
  X
  <div className="delete-hidden"><div className="arrow-left"></div>Delete Channel </div>
  </div>
</Link>
} 
return (
  <li key={channel.id} className={klass}>
    <Link to={`/server/${this.props.server.id}/channel/${channel.id}`}>
      {hash} {channelName} </Link>
    {channelb}
    
  </li>
)