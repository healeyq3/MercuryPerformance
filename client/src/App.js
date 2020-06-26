import React, { Component } from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import './App.css';
import { Provider } from 'react-redux';
import store from './store';
import {  DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

//Components

import NavigationTop from "./components/NavigationTop";
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
