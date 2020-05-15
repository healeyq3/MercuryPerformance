import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import './App.css';

//Pages
import Home from './pages/Home';
import Login from './pages/Login';
import CreateAccount from './pages/CreateAccount';
import TeamSelect from './pages/TeamSelect';

//Components
import NavigationBar from './components/NavigationBar';



class App extends Component {
  render() {
    return (
      <div className="App">
        <Router>
          <NavigationBar />
          <div className = "container">
            <Switch>
              <Route exact path = '/' component = {Home}/>
              <Route exact path = '/teamselect' component = {TeamSelect}/>
              <Route exact path = '/login' component = {Login}/>
              <Route exact path = '/signup' component = {CreateAccount}/>
            </Switch>
          </div>
        </Router>
      </div>
    );
  }
}

export default App;
