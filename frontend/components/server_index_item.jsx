import React from 'react';
import { Link } from 'react-router-dom';

class ServerIndexItem extends React.Component {
  
  render () {
    let image;
    if (!this.props.server.image_url) {
      image = window.logo_url ;
    } else {
      image = this.props.server.image_url;
    }
    
    return (
      <li
        key={this.props.server.id}
      >
        <h3 className="hidden">{this.props.server.server_name}</h3><br></br>
        <Link to={`/server/${this.props.server.id}`}>
        <img src={image}></img>
        </Link> 
      </li>
  );}
}



export default ServerIndexItem;