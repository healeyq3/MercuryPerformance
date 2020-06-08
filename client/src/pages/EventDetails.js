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
          showRunner: false,
          showResults:false,
          reloaded:false
        }
        // this.props.getTeamEvents();
    }
    setShowRunner = e => {
        this.setState({
            showRunner: !this.state.showRunner
        })
      }
      setShowResults = e => {
        this.setState({
            showResults: !this.state.showResults
        })
      }

    render() {
        return (
            <Container>
                <EventNavBar setShowRunner = {this.setShowRunner} setShowResults = {this.setShowResults}></EventNavBar>
                <div class="card-deck">
                <EventRunnerCard></EventRunnerCard>
                <EventDetailsCard></EventDetailsCard>
                <EventAddRunnersModal show = {this.state.showRunner} setShow = {this.setShowRunner} teamUID = {this.props.selectedTeam}/>
                </div>
            </Container>
        )
    }
}

export default EventDetails
