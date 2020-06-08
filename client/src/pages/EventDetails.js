import React, { Component } from 'react'
import EventNavBar from '../components/EventNavBar'
import EventRunnerCard from '../components/EventRunnerCard'
import { Container } from 'react-bootstrap'

export class EventDetails extends Component {
    render() {
        return (
            <Container>
                <EventNavBar></EventNavBar>
                <EventRunnerCard></EventRunnerCard>
            </Container>
        )
    }
}

export default EventDetails
