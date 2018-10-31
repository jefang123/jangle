import React from 'react';
import { connect } from 'react-redux';
import { createJoin } from '../actions/server_actions';
import { fetchAllServers } from '../actions/userjoin_actions'

class JoinServerForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      server_id: ""
    };
    this.servers = [];
    this.handleSubmit = this.handleSubmit.bind(this);
    // this.setServer = this.setServer.bind(this)
  }

  componentDidMount() {
    this.props.fetchAllServers();
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
    this.props.processForm(this.state);
    this.setState({
      server_id: ""
    });
  }

  // setServer (e) {
  //   this.setState({
  //     server_id: e.target.innerText
  //   })
  //   this.servers = [];
  // }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
      // let props = Object.keys(this.props.servers2)
      // this.servers = props.filter(prop => prop.includes(`${this.state.server_id}`))
      // this.servers = this.servers.filter(server => this.prop)
    };
  }
  render () {
    // let servers = this.servers.slice(0,5);
    // const search = servers.map((server,idx)=> {
    //   return (
    //     <li key={idx} onClick={this.setServer}>
    //       {this.props.servers2[server].server_name}
    //     </li>
    //   )
    // })
    const errors = this.props.errors.map((error, idx) => {
      return (
        <p key={idx} >
          {error}
        </p>
      )
    })

    let button;
    if (this.state.server_id === "") {
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
        type='number' 
        min = "1"
        value={this.state.server_id} 
        placeholder="Server ID number"
        onChange={this.update('server_id')}/>
        {/* <div className="server-search">
          {search}
        </div> */}
       {button}
      </form>
    )
  }
}

const mapStateToProps = (state, ownProps) => {
  return {
    errors: state.errors.join
  };
}

const mapDispatchToProps = dispatch => {
  return {
    processForm: join => dispatch(createJoin(join)),
    fetchAllServers: () => dispatch(fetchAllServers)
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(JoinServerForm);
