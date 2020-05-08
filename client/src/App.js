import React, { Component } from 'react';
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
                <Home/>
            )}
            />
            <Route path = "/CreateTeam" render = {props => (
                <CreateTeam/>
            )} />
            <Route path = "/WorkoutInventory" render = {props => (
              <WorkoutInventory />
            )} />
          </div>

        </Router>
    );
  }
}

export default App;

