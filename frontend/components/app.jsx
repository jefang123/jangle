import React from 'react';
import HomeContainer from './home_container';
import { Route, Switch } from 'react-router-dom';
import LoginFormContainer from './login_form_container';
import SignupFormContainer from './signup_form_container';


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

// class App extends React.Component {
//   constructor(props){
//     super(props)
  //   this.state = {
  //     auth: {
  //       isLoggedIn: false, 
  //       user: ''
  //     },
  //     joinServer: {
  //       code: "",
  //       error: false,
  //       serverId: null, 
  //       redirect: false 
  //     },
  //     server: {
  //       server: {},
  //       users: []
  //     }
  //   }
  // }
  // updateAppStateServer = (newServer) => {
  //   this.setState({
  //     server: {
  //       server: newServer.server,
  //       users: newServer.users
  //     }
  //   })
  // }
// }

export default App;

