import React, { Component } from 'react'
import ExistingEventCard from '../components/Event/ExistingEventCard'
import  { Container, Button } from 'react-bootstrap'
import CreateEventModal from '../components/Event/CreateEventModal'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeamEvents, newEvent, setEvent } from '../actions/eventActions';

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

    componentDidMount(){ //need to start loading here

    }
    
    componentDidUpdate(prevProps, prevState, snapshot){
      if(prevProps.rehydrated === false){
        console.log("Events needed - passing: " + this.props.selectedTeam);
        this.props.getTeamEvents(this.props.selectedTeam);
      }
    }

    setSelectedEvent(event){
      this.props.setEvent(event.key);
    }

    render(){
      if(!this.props.selectedTeam){
        return null;
      }

      let cardItems = [];
      for (const event in this.props.events) {
        if (this.props.events.hasOwnProperty(event)) {
           cardItems.push(
          <React.Fragment key = {event}>
            <ExistingEventCard event = {this.props.events[event]} onSelect = {this.setSelectedTeam}/>
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
