import React, { Component } from 'react';
import './css/App.css';
import { Provider } from 'react-redux';
import store from './store';
import {  DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'
import { HashRouter } from 'react-router-dom';

//Components

import NavigationTop from "./components/NavigationTop";
import MainPage from "./pages/MainPage";

class App extends Component {
  render() {
    return (
      <DndProvider backend = {HTML5Backend}>
          <Provider store={store}>
            <HashRouter>
              {/* <NavigationTop/> */}
              <MainPage/>
            </HashRouter>
        </Provider>
      </DndProvider>
      
    );
  }
}

export default App;
