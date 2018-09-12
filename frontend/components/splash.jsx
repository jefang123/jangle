import React from 'react';
import { NavLink } from 'react-router-dom';
     
const Splash = () => {
  return (
    <div>
      <header className="login-header">
        <nav className="login-nav">
          <h2>Home</h2>
          <h2>Discord</h2>
          <h2>Test</h2>
          <h2>Test2</h2>
          <NavLink 
          to='/login'
          className="login-nav nav-button">Log In</NavLink>
        </nav>
      </header> 
 
      <section>
        <h1>It's time to ditch Skype and TeamSpeak.</h1>
        <p>All-in-one voice and text chat for gamers that's free, secure, and works on both your desktop and phone. Stop paying for TeamSpeak servers and hassling with Skype. Simplify your life.</p>
      </section>
    
      <footer>
        <p>Ready to try Discord? It's free!</p>
        <p>JOIN OVER 150 MILLION PLAYERS TODAY</p>
        <NavLink 
        to='/signup' 
        className="login-link">Sign Up Now</NavLink>
      </footer>
    </div>
  );
}

export default Splash;
