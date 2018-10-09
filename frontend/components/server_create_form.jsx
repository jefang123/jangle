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
    this.setState({
      server_name: ""
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.errors !== nextProps.errors) {
      if (nextProps.errors.length < 1) {
        this.props.handleClose();
        
      }
    }
  }

  update(field) {
    return (e) => {
      this.setState({
        [field]: e.target.value
      });
    };
  }
  render () {
    const errors = this.props.errors.map((errors, idx) => {
      return (
        <p key={idx} >
          {errors}
        </p>
      )
    })
    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Create a Server!</h3>  
        <div className="errors" >
          {errors}
        </div>
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
