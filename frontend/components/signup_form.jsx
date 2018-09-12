import React from 'react';
import { Link, Redirect } from 'react-router-dom';

class SignUpForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.processForm(this.state);
    this.setState({
      email: "",
      password: ""
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
    if (this.props.currentUser) {
      return (
        <Redirect to='/' />
      );
    }
    const link = this.props.formType === 'signup' ? <Link className='form-link' to='/login'>Log In</Link> : <Link className='form-link' to='signup'>Register</Link>;
  const header = this.props.formType === 'login' ? 'Log In' : 'Register';

    return (
      <div className="session-container" >
        <form class="session-form" onSubmit={this.handleSubmit}>
          <h2>{header}</h2>
          <label> Email
          </label>
          
            <input type='text' value={this.state.email} onChange={this.update('email')}/>
          

          <label> Username
            </label>
            
            <input
              type='text'
              value={this.state.username}
              onChange={this.update('username')}/>
          

          <label>Password
          </label>
          
            <input type='password' value={this.state.password} onChange={this.update('password')}/>
          
          <button>{header}</button>

          {link}
        </form>
      </div>
    );

  }
}

export default SignUpForm;