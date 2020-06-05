import React, { Component } from 'react'
import ExistingEventCard from '../components/ExistingEventCard'
import  { Container, Button } from 'react-bootstrap'
import CreateEventModal from '../components/CreateEventModal'

export class Events extends Component {
    constructor(props){
        super(props);
        this.state = {
          show: false,
          reloaded:false
        }}
        setShow = e => {
            this.setState({
                show: !this.state.show
            })
          }
    render(){
        return (
            <Container fluid>
                <h2>Events</h2>
                <Button onClick = {this.setShow}>Add</Button>
                <p></p>
                <ExistingEventCard></ExistingEventCard>
                <p></p>
                <CreateEventModal setShow = {this.setShow} show = {this.state.show} />
            </Container>
        )
    }
}

export default Events
