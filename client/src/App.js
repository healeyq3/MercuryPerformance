import React, { Component } from 'react';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import cookie from 'react-cookies';
import store from './store';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import TeamSelect from './pages/TeamSelect';
import Events from './pages/Events';

//Components
import NavigationBar from './components/NavigationBar';
import AuthRoute from './util/AuthRoute.js';
import AuthRoute2 from './util/AuthRoute2';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            <NavigationBar />
            <div className = "container">
              <Switch>
                <AuthRoute exact path = '/login' component = {Login} authenticated = {cookie.load('idToken')}/>
                <AuthRoute2 exact path = '/' component = {Home} authenticated = {cookie.load('idToken')}/>
                <AuthRoute exact path = '/signup' component = {CreateAccount} authenticated = {cookie.load('idToken')}/>
                <AuthRoute2 exact path = '/teamselect' component = {TeamSelect} authenticated = {cookie.load('idToken')}/>
                <AuthRoute2 exact path = '/events' component = {Events} authenticated = {cookie.load('idToken')}/>
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App
