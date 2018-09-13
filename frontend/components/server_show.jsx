import React from 'react';
import { Link } from 'react-router-dom'

class ServerShow extends React.Component {
  componentDidMount () {
    this.props.fetchServer(this.props.match.params.serverId);
  }

  // componentWillReceiveProps(nextProps) {
  //   if (this.props.server.id != nextProps.match.params.serverId) {
  //     this.props.fetchServer(nextProps.match.params.serverId)
  //   }
  // }
  componentWillUpdate(newProps) {
    if (this.props.match.params.serverId != newProps.match.params.serverId) {
      this.props.fetchServer(newProps.match.params.serverId)
    }
  }

  render() {
    if (!this.props.server) return null;
    const users = this.props.users.map(user => {
      return (
        <p key={user.id}>{user.username}</p>
      );
    });
    const { server } = this.props;
    return (
      <div>
        <h3>{server.server_name}</h3>
        {users}
      </div>
    )
  }

}

export default ServerShow;