import React, { Component } from 'react'
import ExistingEventCard from '../components/ExistingEventCard'
import  { Container, Button } from 'react-bootstrap'
import CreateEventModal from '../components/CreateEventModal'
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
        // this.props.getTeamEvents();
    }
    
    setShow = e => {
      this.setState({
          show: !this.state.show
      })
    }

    componentDidMount(){
      console.log("teamUID beign passed: " + this.props.selectedTeam); // this is null
      this.props.getTeamEvents(this.teamUID); // this is null
    }

    componentDidUpdate(prevProps){
      if(prevProps.rehydrated === false){ //not being reached
        console.log("teamUID beign passed: " + this.props.selectedTeam);
        this.props.getTeamEvents(this.props.selectedTeam);
      }
    }
    setSelectedEvent(event){
      this.props.setEvent(event.key);
    
    }

    render(){
      
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
    /*if(this.props.createdEvent.hasOwnProperty("name") && !this.props.events.hasOwnProperty(this.props.createdEvent.key)){
      cardItems.push(
        <React.Fragment key = {this.props.createdEvent.key}>
          <ExistingEventCard team = {this.props.createdEvent}/>
        </React.Fragment>
      )
    }*/
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
    selectedTeam: PropTypes.string.isRequired
  };

  const mapStateToProps = function(state){
    return {
      events: state.events,
      selectedTeam: state.teams.selectedTeam,
      selectedEvent: state.events.selectedEvent,
      createdEvent: state.events.createdTeam
    }
  }

export default connect(mapStateToProps, { newEvent, setEvent, getTeamEvents }) (Events);
