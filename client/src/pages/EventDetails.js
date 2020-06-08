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
          show1: false,
          show2:false,
          reloaded:false
        }
        // this.props.getTeamEvents();
    }
    setShow1 = e => {
        this.setState({
            show1: !this.state.show1
        })
      }
      setShow2 = e => {
        this.setState({
            show2: !this.state.show2
        })
      }

    render() {
        return (
            <Container>
                <EventNavBar setShow1 = {this.setShow1} show = {this.state.show1}></EventNavBar>
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
