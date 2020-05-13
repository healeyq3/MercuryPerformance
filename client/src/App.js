import React, { Component, Fragment } from 'react';
import Login from './components/Login';
import Home from './components/Home'
import CreateAccount from './components/CreateAccount';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import fire from './Fire';
// eslint-disable-next-line
import {withRouter, Switch} from 'react-router-dom';
import TeamSelect from './components/TeamSelect';
import CreateTeam from './components/CreateTeam';
import WorkoutInventory from './components/WorkoutInventory';
import CalendarHome from './components/CalendarHome';
import Settings from "./components/Settings"
// eslint-disable-next-line
import TestCalendar from './components/TestCalendar';


class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      user: {},
    }
  }


  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if(user) {
        this.setState({user});
      } else {
        this.setState({ user: null});
      }
    });
  }

  componentDidMount(){
    this.authListener();
  }

  render(){
    return (
        <Router>
          <div className = "App">

            <Route exact path = "/" render = {props => (
                <div>
                  {this.state.user ? (<TeamSelect />): (<Login />)}
                </div>
            )} />
            <Route path = "/CreateAccount" render = {props => (
                <CreateAccount/>
            )}
            />
            <Route path = "/Home" render = {props => (
                <Fragment>
                  {this.state.user ? (<Home/>) : (<Login />)}
                </Fragment>
            )}
            />
            <Route path = "/CreateTeam" render = {props => (
                <CreateTeam/>
            )} />
            <Route path = "/WorkoutInventory" render = {props => (
              <Fragment>
                {this.state.user ? (<WorkoutInventory/>) : (<Login />)}
              </Fragment>
            )} />
            <Route path = "/CalendarHome" render = {props => (
              <Fragment>
                {this.state.user ? (<CalendarHome/>) : (<Login />)}
              </Fragment>
            )} />
            <Route path = "/Settings" render = {props => (
              <Fragment>
                {this.state.user ? (<Settings/>) : (<Login />)}
              </Fragment>
            )} />
          </div>

        </Router>
    );
  }
}

export default App;

