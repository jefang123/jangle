import React from 'react';
import { Link, withRouter, matchPath } from 'react-router-dom';

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
    let match = matchPath(this.props.history.location.pathname, {
      path: '/server/:serverId/',
      exact: false,
      strict: false 
    });
    let parameter;
    if (!match) {
      parameter = 0;
    } else if (match.params.serverId) {
      parameter = parseInt(match.params.serverId);
    } else {
      parameter = 0;
    }

    let klass;
    
    if (this.props.server.id === parameter) {
      klass = "sv-selected"
    } else {
      klass = ""
    }

    let image;
    if (!this.props.server.image_url) {
      image = window.logo_url ;
    } else {
      image = this.props.server.image_url;
    }
    if (this.props.server.private) {
      return (
        <li
          key={this.props.server.id}
          className={klass}
        >
          <div className="hidden">
            <h3>{this.props.server.server_name}</h3><br></br>
          </div>
          <Link to={`/server/${this.props.server.id}/welcome`}>
          <img src={image}></img>
          </Link> 
        </li>
      );
    } else {
        return (
          <li
            key={this.props.server.id}
            className={klass}
          >
            <div className="hidden">
              <h3>{this.props.server.server_name}</h3><br></br>
            </div>
            <Link to={`/server/${this.props.server.id}`}>
            <img src={image}></img>
            </Link> 
          </li>
      );
    }
    
  }
}

export default withRouter(ServerIndexItem);