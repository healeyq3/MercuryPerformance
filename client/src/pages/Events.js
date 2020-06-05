import React, { Component } from 'react'
import ExistingEventCard from '../components/ExistingEventCard'
import  { Container, Button } from 'react-bootstrap'
import CreateEventModal from '../components/CreateEventModal'
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getTeamEvents, newEvent, setEvent } from '../actions/eventActions';
import {Row} from 'react-bootstrap';

export class Events extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
          reloaded:false
        }
        this.props.getTeamEvents();
    }
        setShow = e => {
            this.setState({
                show: !this.state.show
            })
          }
          componentDidMount(){
            this.props.getTeamEvents();
          }
    render(){
        let cardItems = [];
        for (const event in this.props.events) {
      if (this.props.events.hasOwnProperty(event)) {
        cardItems.push(
        <React.Fragment key = {event}>
          <ExistingEventCard event = {this.props.event}/>
        </React.Fragment>
        )
      }
    }
        return (
            <Container fluid>
                <h2>Events</h2>
                <Button onClick = {this.setShow}>Add</Button>
                <p></p>
                 <Row>{cardItems}</Row>
                <p></p>
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
      selectedEvent: state.events.selectedEvent
    }
  }

export default connect(mapStateToProps, { newEvent, setEvent, getTeamEvents }) (Events);
