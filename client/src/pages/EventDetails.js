import React, { Component } from 'react'
import EventNavBar from '../components/Event/EventNavBar'
import EventRunnerCard from '../components/Event/EventRunnerCard'
import { Container } from 'react-bootstrap'
import EventDetailsCard from '../components/Event/EventDetailsCard'

export class EventDetails extends Component {
    render() {
        return (
            <Container>
                <EventNavBar></EventNavBar>
                <div class="card-deck">
                <EventRunnerCard></EventRunnerCard>
                <EventDetailsCard></EventDetailsCard>
                </div>
            </Container>
        )
    }
}

export default EventDetails
