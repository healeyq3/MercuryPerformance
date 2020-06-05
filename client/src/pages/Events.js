import React, { Component } from 'react'
import ExistingEventCard from '../components/ExistingEventCard'
import  { Container } from 'react-bootstrap'

export class Events extends Component {
    render() {
        return (
            <Container fluid>
                <h2>Events</h2>
                <ExistingEventCard></ExistingEventCard>
                <p></p>
                <ExistingEventCard></ExistingEventCard>
            </Container>
        )
    }
}

export default Events
