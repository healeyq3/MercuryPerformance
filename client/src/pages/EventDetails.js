import React, { Component } from 'react'
import EventNavBar from '../components/event/EventNavBar'
import EventRunnerCard from '../components/event/EventRunnerCard'
import { Container } from 'react-bootstrap'
import EventDetailsCard from '../components/event/EventDetailsCard'
import EventAddRunnersModal from '../components/event/EventAddRunnersModal'

export class EventDetails extends Component {
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

    render() {
        return (
            <Container>
                <EventNavBar setShow = {this.setShow}></EventNavBar>
                <div class="card-deck">
                <EventRunnerCard></EventRunnerCard>
                <EventDetailsCard></EventDetailsCard>
                <EventAddRunnersModal setShow = {this.setShow} show = {this.state.show} teamUID = {this.props.selectedTeam}/>
                </div>
            </Container>
        )
    }
}

export default EventDetails
