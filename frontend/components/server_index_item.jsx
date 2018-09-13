import React from 'react';
import { Link } from 'react-router-dom';

class ServerIndexItem extends React.Component {
  render () {
    return (
      <li
        key={this.props.server.id}
      >
      {this.props.server.server_name}
      </li>
  );}
}



export default ServerIndexItem;
{/* <Link to={`/server/${this.props.Server.id}`}>
  <h3>{this.props.Server.name}</h3><br></br>
  <img src={this.props.Server.image_url}></img>
  </Link> */}