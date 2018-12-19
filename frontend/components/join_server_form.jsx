import React from 'react';
import { connect } from 'react-redux';
import { createJoin, fetchServers } from '../actions/server_actions';

class JoinServerForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      server_name: ""
    };
    this.servers = [];
    this.handleSubmit = this.handleSubmit.bind(this);
    this.setServer = this.setServer.bind(this)
  }

  componentDidMount() {
    this.props.fetchServers();
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.errors !== nextProps.errors) {
      if (nextProps.errors.length < 1) {
        this.props.handleClose();
      }
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
    // this.props.processForm({server_id: serverId});
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

  update(field) {
    let filteredServers = this.props.servers.filter(server =>{
      if (server.user_ids) {
        return !server.private && !server.user_ids.includes(this.props.currentUser.id)
      }
    });
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
      this.servers = filteredServers.filter(server => {
        return server.server_name.includes(this.state.server_name)
      })
     
    };
  }
  render () {
    let servers = this.servers.slice(0,5);
    const search = servers.map((server,idx)=> {
      return (
        <li key={idx} onClick={this.setServer}>
          {server.server_name}
        </li>
      )
    })
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
        <input  
        type='text'
        placeholder="Search Servers"
        value={this.state.server_name}
        onChange={this.update('server_name')}/>
        <div className="server-search">
          {search}
        </div>
       {button}
      </form>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    servers: Object.values(state.entities.servers),
    errors: state.errors.join
  };
}

const mapDispatchToProps = dispatch => {
  return {
    fetchServers: () => dispatch(fetchServers()),
    processForm: join => dispatch(createJoin(join))
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(JoinServerForm);
