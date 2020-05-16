import React, { Component, HomeContainer } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';
import fire from './Fire';
import { Provider } from 'react-redux';
import cookie from 'react-cookies';
import Store from './store';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import TeamSelect from './pages/TeamSelect';
import jwtDecode from 'jwt-decode';
//Components
import NavigationBar from './components/NavigationBar';
import AuthRoute from './util/AuthRoute.js';

class App extends Component {
  render() {
    return (
      <Provider store={Store}>
        <div className="App">
          <Router>
            <NavigationBar />
            <div className = "container">
              <Switch>
                <Route exact path = '/' component = {Home}/>
                <Route exact path = '/teamselect' component = {TeamSelect}/>
                <AuthRoute exact path = '/login' component = {Login} authenticated = {cookie.load('idToken')}/>
                <AuthRoute exact path = '/signup' component = {CreateAccount} authenticated = {cookie.load('idToken')}/>
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App
