import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { merge } from 'lodash';

class SessionForm extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }
  
  componentDidMount () {
    this.props.clearError();
  }

  handleClick(e) {
    e.preventDefault();
    this.props.processForm(merge({},{email:'demo', password:'123456'}));
   
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
        <Redirect to={`/server/${window.homeId}/welcome`}/>
      );
    }
    const errors = this.props.errors.map((error, idx) => {
      return (
        <p key={idx}>
          {error}
        </p>
      );
    })
    const link = this.props.formType === 'signup' ? <Link className='form-link' to='/login'>Log In</Link> : <Link className='form-link' to='signup'>Register a new account</Link>;
  const header = this.props.formType === 'login' ? 'Log In' : 'Register';
    
    return (
      <div className='bg'>

     
      <div className='session-container'>
         <Link to='/'>  
          <img className='logo' src={window.logo_url}/>
          </Link>
          <div className="errors">
            {errors}
          </div>
        <div className="session-form">
          <button className="demo" onClick= {this.handleClick}>Demo User!</button>
          <div className="divider"></div>
          <form onSubmit={this.handleSubmit}>
            <h2>{header}</h2>
            <label> Email
            </label>
            
              <input type='text' value={this.state.email} onChange={this.update('email')}/>
              {/* <input type='email' value={this.state.email} onChange={this.update('email')}/> */}
            

            <label>Password
            </label>
            
              <input type='password' value={this.state.password} onChange={this.update('password')}/>
          
            <button>{header}</button>

            {link}
          </form>
        </div>
      </div>

       </div>
    );

  }
}

export default SessionForm;
