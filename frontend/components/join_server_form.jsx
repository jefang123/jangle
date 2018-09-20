import React from 'react';

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
        <label>Server ID</label>
        <input 
        type='number' 
        value={this.state.server_id} 
        onChange={this.update('server_id')}/>
        <button>Join Server</button>
      </form>
    )
  }
}


export default JoinServerForm;