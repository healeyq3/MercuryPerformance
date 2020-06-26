import React, { Component } from 'react'
import ExistingEventCard from '../components/event/ExistingEventCard'
import  { Container, Button } from 'react-bootstrap'
import CreateEventModal from '../components/event/CreateEventModal'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeamEvents, newEvent, setEvent } from '../actions/eventActions';
import {Redirect} from 'react-router-dom'

export class Events extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
          reloaded:false
        }

        this.setSelectedEvent = this.setSelectedEvent.bind(this);
    }
    
    setShow = e => {
      this.setState({
          show: !this.state.show
      })
    }
    
    componentDidUpdate(prevProps){
      if(prevProps.rehydrated === false){
        this.props.getTeamEvents(this.props.selectedTeam);
      }
    }

    setSelectedEvent(event){
      this.props.setEvent(event.key);
      this.setState({
        gotoEventDetails: true
      })
    }

    render(){
      if(!this.props.selectedTeam){
        return null;
      } else if(this.state.gotoEventDetails){
        return <Redirect to="/eventdetails"/>
      }

      let cardItems = [];
      for (const event in this.props.events) {
        if (this.props.events.hasOwnProperty(event)) {
           cardItems.push(
          <React.Fragment key = {event}>
            <ExistingEventCard event = {this.props.events[event]} onSelect = {this.setSelectedEvent}/>
          </React.Fragment>
          )
        }
      }

  

      return (
          <Container fluid>
              <h2>Events</h2>
              <Button onClick = {this.setShow}>Add</Button>
               {cardItems}
              <CreateEventModal setShow = {this.setShow} show = {this.state.show} teamUID = {this.props.selectedTeam}/>
          </Container>
      )
    }
}
Events.propTypes = {
    setEvent: PropTypes.func.isRequired,
    getTeamEvents: PropTypes.func.isRequired,
    events: PropTypes.object.isRequired,
    selectedTeam: PropTypes.string.isRequired,
    rehydrated: PropTypes.bool.isRequired,
    selectedEvent: PropTypes.string
  };

const mapStateToProps = function(state){
  return {
    events: state.events.events,
    selectedTeam: state.teams.selectedTeam,
    selectedEvent: state.events.selectedEvent,
    createdEvent: state.events.createdEvent,
    rehydrated: state._persist.rehydrated
  }
}

export default connect(mapStateToProps, { newEvent, setEvent, getTeamEvents }) (Events);
