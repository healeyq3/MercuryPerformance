import React, { Component } from "react";
import ExistingEventCard from "../components/event/ExistingEventCard";
import { Container, Button } from "react-bootstrap";
import CreateEventModal from "../components/event/CreateEventModal";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getHolderEvents, newEvent, setEvent } from "../actions/eventActions";
import { Redirect } from "react-router-dom";
import "../css/events.css";

export class Events extends Component {
  constructor(props) {
    super(props);
    this.state = {
      show: false,
      reloaded: false,
    };

    this.setSelectedEvent = this.setSelectedEvent.bind(this);
  }

  setShow = (e) => {
    this.setState({
      show: !this.state.show,
    });
  };

  componentDidUpdate(prevProps) {
    if (prevProps.rehydrated === false) {
      this.props.getHolderEvents(this.props.selectedHolder);
    }
  }

  setSelectedEvent(event) {
    this.props.setEvent(event.key);
    this.setState({
      gotoEventDetails: true,
    });
  }

  render() {
    if (!this.props.selectedTeam || !this.props.selectedHolder) {
      return null;
    } else if (this.state.gotoEventDetails) {
      return <Redirect to="/eventdetails" />;
    }

    let cardItems = [];
    for (const event in this.props.events) {
      if (this.props.events.hasOwnProperty(event)) {
        console.log("Got into if Statement")
        cardItems.push(
          <React.Fragment key={event}>
            <ExistingEventCard
              event={this.props.events[event]}
              onSelect={this.setSelectedEvent}
            />
          </React.Fragment>
        );
      }
    }
    console.log(this.props.eventHolders[this.props.selectedHolder])
    return (
      <Container fluid>
        <h2>Events</h2>
        <Button onClick={this.setShow}>Add</Button>
        <div className="events-card-container">{cardItems}</div>
        <CreateEventModal
          setShow={this.setShow}
          show={this.state.show}
          teamUID={this.props.selectedTeam}
          holder = {this.props.eventHolders[this.props.selectedHolder]}
          selectedHolder = {this.props.selectedHolder}
        />
      </Container>
    );
  }
}
Events.propTypes = {
  setEvent: PropTypes.func.isRequired,
  events: PropTypes.object.isRequired,
  selectedTeam: PropTypes.string.isRequired,
  rehydrated: PropTypes.bool.isRequired,
  selectedEvent: PropTypes.string,
  selectedHolder: PropTypes.string.isRequired,
  eventHolders: PropTypes.object.isRequired
};

const mapStateToProps = function (state) {
  return {
    events: state.events.holderEvents,
    eventHolders: state.events.eventHolders,
    selectedTeam: state.teams.selectedTeam,
    selectedEvent: state.events.selectedEvent,
    createdEvent: state.events.createdEvent,
    selectedHolder: state.events.selectedEventHolder,
    rehydrated: state._persist.rehydrated,
  };
};

export default connect(mapStateToProps, {
  newEvent,
  setEvent,
  getHolderEvents,
})(Events);
