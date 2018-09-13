import React from 'react';
import HomeContainer from './home_container';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';
import ServerShowContainer from './server_show_container';
import { ProtectedRoute } from '../util/route_util';


const App = () => {
  return (
    <div>
      <Switch>
        <Route path='/login' component={LoginFormContainer} />
        <Route path='/signup' component={SignupFormContainer} />
        <div>
          <Route path='/' component={HomeContainer} />
          <ProtectedRoute path='/server/:serverId' component={ServerShowContainer} />
        </div>
      </Switch>
    </div>
  );
};


{/* <Route path='/server/:serverId/channel/:channelId' /> */}

export default App;

// const App = () => {
//   return (
//     <div>
//       <h1>Discord</h1>
//       <AuthRoute exact path='/' component={HomeContainer} />
//       <ProtectedRoute exact path='/' component={LoggedInContainer} />
//       <AuthRoute path='/login' component={LoginFormContainer} />
//       <AuthRoute path='/signup' component={SignupFormContainer} />
//     </div>
//   );
// };