import React from 'react';
import { Link } from 'react-router-dom';

class ServerIndexItem extends React.Component {
  constructor (props) {
    super(props)
  }
  contextMenu (e) {
    e.preventDefault();
  }

  handleClick (e) {
    e.preventDefault();
  }

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
        <div className="hidden">
          <h3>{this.props.server.server_name}</h3><br></br>
        </div>
        <Link to={`/server/${this.props.server.id}`}>
        <img onContextMenu={this.contextMenu.bind(this)} src={image}></img>
        </Link> 
      </li>
  );}
}

export default ServerIndexItem;