import React, { Component } from '../../../node_modules/react'
import { Modal, Form, Button, FormControl } from '../../../node_modules/react-bootstrap';
import { connect } from '../../../node_modules/react-redux';
import { newEvent } from '../../actions/eventActions';
import PropTypes from "prop-types";
import { getCleanDate, fixDateSelector } from '../../math/DateAlgos'

export class CreateEventModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            date: '',
            location: '',
            distance: 0.0,
            distanceUnit: ''
        }

        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        if(e.target.name === 'date'){
            let part1 = fixDateSelector(e.target.value)
            let part2 = getCleanDate(part1);
            this.setState({
                date: part2
            })
        } else {
            this.setState({ [e.target.name] : e.target.value});
        }
        
    }
    handleCreateEvent = () => {
        const eventData = {
            name: this.state.name,
            date: this.state.date,
            location: this.state.location,
            distance: this.state.distance,
            distanceUnit: this.state.distanceUnit
        }
        this.props.newEvent(eventData, this.props.teamUID);//need to pass in selectedTeamUID here
        this.props.setShow();
    }

    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            {/* <Modal.Dialog> */}
                <Modal.Header closeButton>Create New Event</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "name" type = "text" placeholder = "Enter Event Name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "date" type = "date"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "location" type = "text" placeholder = "Enter Event Location"/>
                        </Form.Group>
                        <Form.Group>
                        <Form.Label>Event Distance</Form.Label>
                            <FormControl
                            placeholder="Enter numerical distance"
                            onChange = {this.handleChange}
                            name = 'distance'
                            type = 'text'
                            />
                            <FormControl
                            onChange = {this.handleChange}
                            name = 'distanceUnit'
                            as = 'select'
                            > 
                                <option hidden>Units</option>
                                <option>Miles</option>
                                <option>Kilometers</option>
                                <option>Meters</option>
                            </FormControl> 
                        </Form.Group>
                        <Button variant = "primary" onClick = {this.handleCreateEvent}>Add Event</Button>
                    </Form>
                </Modal.Body>
            {/* </Modal.Dialog> */}
            </Modal>
        )
    }
}

CreateEventModal.propTypes = {
    teams: PropTypes.object.isRequired,
    selectedTeam: PropTypes.string.isRequired
}

const mapStateToProps = function (state) {
    return {
        teams: state.teams.teams,
        selectedTeam: state.teams.selectedTeam
    }
}

export default connect(mapStateToProps, { newEvent }) (CreateEventModal);
