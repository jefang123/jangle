import React from 'react';
import { NavLink } from 'react-router-dom';
import { connect } from 'react-redux';
import { login } from '../actions/session_actions';

class Splash extends React.PureComponent {
  render() {
    return (
      <div className="splash-div">
        <header className="login-header">
          <nav className="login-nav">
            <img src={window.logo_url}/>
            <h2>Jangle</h2>
            <div className="contact">
            <h2 >About Me</h2>
              <div className="hidden-contact">
                <li><a target="_blank" href="https://github.com/jefang123">Github</a></li>
                <li><a target="_blank" href="https://www.linkedin.com/in/jeffrey-fang-bb11b5165/">LinkedIn</a></li>
                <li><a target="_blank" href="https://jefang123.github.io/">Portfolio</a></li>
              </div>
            </div>

            
            <button className="splash-demo" onClick={()=>{this.props.login({email:'demo', password:'123456'})}}>Demo User</button>
            <NavLink 
            to='/login'
            className="login-nav nav-button">Log In</NavLink>
          </nav>
        </header > 
  
        <section className="login-section">
          <h1>It's time to ditch Skype and TeamSpeak.</h1>
          <p>All-in-one voice and text chat for gamers that's free, secure, and works on both your desktop and phone. Stop paying for TeamSpeak servers and hassling with Skype. Simplify your life.</p>
        </section>

        <section className="img-container">
          <img className="bomb" src={window.bomb_url}/>
          <img className="box" src={window.box_url}/>
          <img className="catridge" src={window.catridge_url}/>
          <img className="coin" src={window.coin_url}/>
          <img className="coin2" src={window.coin_url}/>
          <img className="computer" src={window.computer_url}/>
          <img className="headphones" src={window.headphones_url}/>
          <img className="pc" src={window.pc_url}/>
          <img className="smartphoneb" src={window.smartphone_box_url}/>
          <img className="smartphoner" src={window.smartphone_round_url}/>
          <img className="controller" src={window.controller_url}/>
          <img className="potion" src={window.potion_url}/>
          <img className="disc" src={window.disc_url}/>
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
