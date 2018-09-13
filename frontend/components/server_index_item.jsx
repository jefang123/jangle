import React from 'react';
import { Link } from 'react-router-dom';

class ServerIndexItem extends React.Component {
  render () {
    return (
      <li
        key={this.props.server.id}
      >
        <Link to={`/server/${this.props.server.id}`}>
        <h3>{this.props.server.server_name}</h3><br></br>
        <img src={this.props.server.image_url}></img>
        </Link> 
      </li>
  );}
}



export default ServerIndexItem;