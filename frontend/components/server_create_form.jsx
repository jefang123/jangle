import React from 'react';

class ServerCreateForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      server_name: "",
      creator_id: this.props.currentUser.id 
    };
    this.errors = [];
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
    // App.cable.subscriptions.subscriptions[0].speak3(this.state);
    this.errors = [];
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
    this.errors = this.props.errors.map((errors, idx) => {
      return (
        <p key={idx} >
          {errors}
        </p>
      )
    })
    let button; 
    if (this.state.server_name === "") {
      button = <button disabled>Create Server</button>
    } else {
      button = <button>Create Server</button>
    }

    return (
      <form onSubmit={this.handleSubmit}>
        <h3>Create a Server!</h3>  
        <div className="errors" >
          {this.errors}
        </div>
        <input 
        type='text' 
        value={this.state.server_name} 
        placeholder= "Server Name"
        onChange={this.update('server_name')}/>
        {button}
      </form>
    )
  }
}


export default ServerCreateForm;
