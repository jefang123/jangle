import React from 'react';
import HomeContainer from './home_container';
import { Route } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';

const App = () => {
  return (
    <div>
      <Route exact path='/' component={HomeContainer} />
      <Route path='/login' component={LoginFormContainer} />
      <Route path='/signup' component={SignupFormContainer} />
    </div>
  );
};




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