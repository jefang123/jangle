import React from 'react';
import { Link } from 'react-router-dom';

class ServerIndexItem extends React.Component {
  
  render () {
    let image = this.props.server.image_url;
    if (!this.props.server.image_url) {
      const image = window.logo_url
    };
    return (
      <li
        key={this.props.server.id}
      >
        <h3 className="hidden">{this.props.server.server_name}</h3><br></br>
        <Link to={`/server/${this.props.server.id}`}>
        <img src={window.logo_url}></img>
        </Link> 
      </li>
  );}
}



export default ServerIndexItem;