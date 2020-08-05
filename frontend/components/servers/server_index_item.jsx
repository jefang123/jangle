import React from 'react';
import { Link, withRouter, matchPath } from 'react-router-dom';

class ServerIndexItem extends React.PureComponent {
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

    const currentServer = parseInt(match.params.serverId)
    const { server } = this.props;
    let klass, image, link;
 
    klass = server.id === currentServer ? "sv sv-selected" : "sv"
    image = server.image_url ? server.image_url : window.logo_url
    link = server.private ? `/server/${server.id}/welcome` : `/server/${server.id}` 

    return (
      <li
          key={server.id}
          className={klass}
          servername={server.server_name}
        > 
          <div className='selected-border'></div>
          <Link to={link}>
            <img src={image}></img>
          </Link> 
        </li>
    )
  }
}

export default withRouter(ServerIndexItem);