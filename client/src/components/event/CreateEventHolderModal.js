import React, { Component } from 'react'
import { fixDateSelector, getCleanDate } from '../../math/DateAlgos';
import { Modal, Form, Button } from 'react-bootstrap';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { newEventHolder } from '../../actions/eventActions';

export class CreateEventHolderModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            name: '',
            date: '',
            toDate : false,
            date2 : '',
            location : ''
        }
        this.handleChange = this.handleChange.bind(this)
    }

    handleChange(e){
        if(e.target.name === 'date'){
            let part1 = fixDateSelector(e.target.value)
            let part2 = getCleanDate(part1);
            this.setState({
                date: part2
            })
        } else if(e.target.name === 'date2'){
            let part1 = fixDateSelector(e.target.value)
            let part2 = getCleanDate(part1);
            this.setState({
                date2: part2
            })
        } else {
            this.setState({ [e.target.name] : e.target.value});
        }
    }

    setDate = e => {
        this.setState({
            toDate : !this.state.toDate
        })
    }

    handleCreateEvent = e => {
        let eventData = {};
        if(this.state.toDate === false){
            eventData = {
                name: this.state.name,
                date : this.state.date,
                location : this.state.location
            }
        } else {
            eventData = {
                name: this.state.name,
                date : this.state.date,
                date2 : this.state.date2,
                location : this.state.location
            }
        }
        this.props.newEventHolder(eventData, this.props.teamUID);
        this.props.setShow();
    }

    reset = () => {
        this.setState({
            toDate: false
        })
    }


    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset}>
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
                            <Form.Label>Multiple Day Event</Form.Label>
                            <input type = "checkbox" id = "to-date" name = 'to-date' value = {this.state.toDate} onChange = {this.setDate}/>
                            {this.state.toDate === false ? <React.Fragment></React.Fragment> : <Form.Control onChange = {this.handleChange} name = "date2" type = 'date'/>}
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Location</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "location" type = "text" placeholder = "Enter Event Location"/>
                        </Form.Group>
                        <Button onClick = {this.handleCreateEvent}>Add Event</Button>
                    </Form>
                </Modal.Body>
            </Modal>
        )
    }
}

CreateEventHolderModal.propTypes = {
    teams: PropTypes.object.isRequired,
    selectedTeam : PropTypes.string.isRequired
}

const mapStateToProps = function (state) {
    return {
        teams: state.teams.teams,
        selectedTeam : state.teams.selectedTeam
    }
}

export default connect(mapStateToProps, { newEventHolder })(CreateEventHolderModal);
