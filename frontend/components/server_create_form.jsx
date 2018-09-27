import React from 'react';

class ServerCreateForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      server_name: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
    this.props.handleClose();
    this.setState({
      server_name: ""
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
        <h3>Create a Server!</h3>  
        <input 
        type='text' 
        value={this.state.server_name} 
        placeholder= "Server Name"
        onChange={this.update('server_name')}/>
        <button>Create Server</button>
      </form>
    )
  }
}


export default ServerCreateForm;
