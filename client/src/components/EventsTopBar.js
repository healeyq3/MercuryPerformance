import React, { Component } from 'react';
import cookie from 'react-cookies'
import {withRouter} from "react-router-dom";
import "../css/events-top.css"
import {Button} from "react-bootstrap";

class EventsTopBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      gotoLogin: false
    }
  }

  render() {
    if(!cookie.load('mercury-fb-token')){
      return null;
    }
    return (
      <div className="events-top-container">
        <div id="events-top-page-name-container">
          <h1 id="events-top-page-name">Events</h1>
        </div>
        <Button id="events-top-add-runner-button">Create Event</Button>
      </div>
    )
  }
}

export default withRouter(EventsTopBar);
