import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/session_actions';

class Splash extends React.Component {
  render() {
    return (
      <div className="splash-div">
        <header className="login-header">
          <nav className="login-nav">
            <img src={window.logo_url}/>
            <h2>Home</h2>
            <h2>Jangle</h2>
            <h2>Test</h2>
            <button onClick={()=>{this.props.login({email:'demo', password:'123456'})}}>Demo User</button>
            <NavLink 
            to='/login'
            className="login-nav nav-button">Log In</NavLink>
          </nav>
        </header > 
  
        <section className="login-section">
          <h1>It's time to ditch Skype and TeamSpeak.</h1>
          <p>All-in-one voice and text chat for gamers that's free, secure, and works on both your desktop and phone. Stop paying for TeamSpeak servers and hassling with Skype. Simplify your life.</p>
        </section>
      
        <footer className="login-footer">
          <div>
            <p>Ready to try Jangle? It's free!</p>
            <p>JOIN OVER 150 MILLION PLAYERS TODAY</p>
          </div>
          <NavLink 
          to='/signup' 
          className="login-link">Sign Up Now</NavLink>
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    login: user => dispatch(login(user))
  };
};

export default connect(null, mapDispatchToProps)(Splash);

{/* <NavLink 
            to='/login'
            className="login-nav nav-button demo-button">Demo User</NavLink> */}