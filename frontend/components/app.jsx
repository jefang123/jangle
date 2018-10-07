import React from 'react';
import HomeContainer from './home_container';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import { ProtectedRoute } from '../util/route_util';
import ServerShowContainer from './server_show_container';
import ChannelShowContainer from './channel_show_container';


const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/login' component={LoginFormContainer} />
        <Route path='/signup' component={SignupFormContainer} />
        <Route path='/' component={HomeContainer} />
      </Switch>
    </div>
  );
};


export default App;

