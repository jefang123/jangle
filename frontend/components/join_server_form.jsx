import React from 'react';
import { connect } from 'react-redux';
import SearchBar from './search-bar';

class JoinServerForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      server_name: ""
    };
    this.servers = this.props.servers || [] ;
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setServer = this.setServer.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.errors !== nextProps.errors) {
      if (nextProps.errors.length < 1) {
        this.props.handleClose();
      }
    }

    if (this.props.servers !== nextProps.servers) {
      this.servers = nextProps.servers
    }
  }

  handleSubmit(e) {
    e.preventDefault();
    let serverId;
    let userId = this.props.currentUser.id;
    for (let i=0; i<this.props.servers.length; i++) {
      if (this.props.servers[i].server_name === this.state.server_name) {
        serverId = this.props.servers[i].id
      }
    }
    App.cable.subscriptions.subscriptions[0].join({server_id: serverId, user_id: userId})
    this.setState({
      server_name: ""
    });
  }

  setServer (e) {
    this.servers = [];
    this.setState({
      server_name: e.target.innerText
    })
  }

  render () {
    const errors = this.props.errors.map((error, idx) => {
      return (
        <p key={idx} >
          {error}
        </p>
      )
    })

    let button;
    if (this.state.server_name === "") {
      button = <button disabled>Join Server</button>
    } else {
      button = <button>Join Server</button>
    }
    return (
      <form onSubmit={this.handleSubmit}>
        <div className="joinerrors">

          {errors}
        </div>
        <h3> Join a Server!</h3>
        <SearchBar 
          field = {this.state.server_name}
          type = "server"
          servers = {this.servers}
          setServer = {this.setServer}
        />
       {button}
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    servers: state.entities.search.servers,
    errors: state.errors.join
  };
}

export default connect(mapStateToProps, null)(JoinServerForm);
