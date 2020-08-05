import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import CreateEventHolderModal from '../components/event/CreateEventHolderModal';
import { Button, Card, Row, Col } from 'react-bootstrap';
import { getEventHolders, setEventHolder, getHolderEvents } from '../actions/eventActions';
import { Redirect } from 'react-router-dom'

export class EventHolder extends Component {
    constructor(props){
        super(props);
        this.state = {
            show: false,
            gotoEvents: false
        }
    }

    setShow = e => {
        this.setState({
            show: !this.state.show
        })
    }

    setSelectedEventHolder(eH){
        this.props.setEventHolder(eH);
        this.props.getHolderEvents(eH);
        this.setState({
            gotoEvents: true
        })
    }

    componentDidUpdate(prevProps){
        if(prevProps.rehydrated === false){
            this.props.getEventHolders(this.props.selectedTeam)
        }
    }


    render() {
        if(!this.props.selectedTeam){
            return null;
        } else if(this.state.gotoEvents){
            return <Redirect to = '/events'/>
        }
        
        let cardItems = [];
        for(const eH in this.props.eventHolders){
            if(this.props.eventHolders.hasOwnProperty(eH)) {
                cardItems.push(
                    <React.Fragment>
                        <Card style = {{width: '50%', height: '10%', cursor: 'pointer'}} tag = 'a' onClick = {() => this.setSelectedEventHolder(eH)}>
                            <Card.Body>
                                <Row>
                                    <Col>
                                        <Card.Title>{this.props.eventHolders[eH].name}</Card.Title>
                                    </Col>
                                    <Col>
                                        <p>{this.props.eventHolders[eH].location}</p>
                                    </Col>
                                </Row>
                            </Card.Body>
                        </Card>
                    </React.Fragment>
                )
            }
        }

        return (
            <div>
                <Button onClick = {this.setShow}>Create New Event</Button>
                <CreateEventHolderModal teamUID = {this.props.selectedTeam} setShow = {this.setShow} show = {this.state.show}/>
                {cardItems}
            </div>
        )
    }
}

EventHolder.propTypes = {
    selectedTeam : PropTypes.string.isRequired,
    rehydrated: PropTypes.bool.isRequired,
    teams: PropTypes.object.isRequired,
    eventHolders: PropTypes.object.isRequired
}

const mapStateToProps = function(state){
    return {
        selectedTeam: state.teams.selectedTeam,
        teams: state.teams.teams,
        rehydrated: state._persist.rehydrated,
        eventHolders : state.events.eventHolders
    }
}

export default connect(mapStateToProps, {getEventHolders, setEventHolder, getHolderEvents})(EventHolder)
