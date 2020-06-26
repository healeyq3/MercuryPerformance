import React, { Component } from 'react';
import {BrowserRouter as Router, Switch} from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import cookie from 'react-cookies';
import store from './store';
import {  DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

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
import WorkoutDateDetails from './pages/WorkoutDateDetails';
import WorkoutCreator from './pages/WorkoutCreator';

//Components
import AuthRoute from './util/AuthRoute.js';
import AuthRoute2 from './util/AuthRoute2';
import AuthRoute3 from './util/AuthRoute3';
import NavigationTop from "./components/NavigationTop";
import NavigationSide from "./components/NavigationSide";
import MainPage from "./pages/MainPage";

class App extends Component {
  render() {
    return (
      <DndProvider backend = {HTML5Backend}>
          <Provider store={store}>
          <div className="container">
            <Router>
              <NavigationTop/>
              <MainPage/>
            </Router>
          </div>
        </Provider>
      </DndProvider>
      
    );
  }
}

export default App;
