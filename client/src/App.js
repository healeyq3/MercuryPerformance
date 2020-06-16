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
import EventDetails from './pages/EventDetails'
import ComingSoon from './pages/ComingSoon';
import Workouts from './pages/Workouts';
import WorkoutDetails from './pages/WorkoutDetails';

//Components
import NavigationBar from './components/NavigationBar';
import AuthRoute from './util/AuthRoute.js';
import AuthRoute2 from './util/AuthRoute2';
import AuthRoute3 from './util/AuthRoute3';
import { OpeningBar } from './components/OpeningBar';



class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <div className="App">
          <Router>
            {cookie.load('idToken') == null ? <OpeningBar></OpeningBar> : <NavigationBar />}
            <div className = "container">
              <Switch>
                <AuthRoute exact path = '/login' component = {Login} authenticated = {cookie.load('idToken')}/>
                <AuthRoute3 exact path = '/' component = {Home} authenticated = {cookie.load('idToken')} team = {cookie.load('selectedTeam')}/>
                <AuthRoute exact path = '/signup' component = {CreateAccount} authenticated = {cookie.load('idToken')}/>
                <AuthRoute2 exact path = '/teamselect' component = {TeamSelect} authenticated = {cookie.load('idToken')}/>
                <AuthRoute2 exact path = '/comingsoon' component = {ComingSoon} authenticated = {cookie.load('idToken')}/>
                <AuthRoute3 exact path = '/events' component = {Events} authenticated = {cookie.load('idToken')} team = {cookie.load('selectedTeam')}/>
                <AuthRoute3 exact path = '/eventdetails' component = {EventDetails} authenticated = {cookie.load('idToken')} team = {cookie.load('selectedTeam')}/>
                <AuthRoute3 exact path = '/workouts' component = {Workouts} authenticated = {cookie.load('idToken')} team = {cookie.load('selectedTeam')} />
                <AuthRoute3 exact path = '/workoutdetails' component = {WorkoutDetails} authenticated = {cookie.load('idToken')} team = {cookie.load('selectedTeam')} />
              </Switch>
            </div>
          </Router>
        </div>
      </Provider>
    );
  }
}

export default App;
