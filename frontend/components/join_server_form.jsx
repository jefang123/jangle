import React from 'react';
import { connect } from 'react-redux';
import { createJoin } from '../actions/server_actions';
import * as APIJoins from '../util/userjoin_api_util';

class JoinServerForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server_id: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
    this.props.handleClose();
    this.setState({
      server_id: ""
    });
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    };
  }
  render () {
    return (
      <form onSubmit={this.handleSubmit}>
        <h3> Join a Server!</h3>
        <input 
        type='number' 
        value={this.state.server_id} 
        placeholder="Server ID number"
        onChange={this.update('server_id')}/>
        <button>Join Server</button>
      </form>
    )
  }
}

const mapDispatchToProps = dispatch => {
  return {
    processForm: join => dispatch(createJoin(join))
  }
}


export default connect(null, mapDispatchToProps)(JoinServerForm);
