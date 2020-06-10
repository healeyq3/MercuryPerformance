import React, { Component } from 'react'
import { Modal, Form, Button } from 'react-bootstrap';
import cookie from 'react-cookies';
import { newTime } from '../../actions/eventActions'
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

export class AddResultsModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            finalTime: '',
            splits:[],
            splitUnit: '',
            splitDistance: '',//May be an easier way, could add to arrays when you add split in order to not limit # of splits
            splitTime:''
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    handleAddSplits = () => {
            const splitData = {
                splitDistance: this.state.splitDistance,
                splitTime: this.state.splitTime,
                splitUnit: this.state.splitUnit
            }
            console.log(splitData)
            this.setState((state) => ({ splits:[...this.state.splits, splitData]}));
    }
    handleAddResults = () => {
        const runnerData = {
            user: cookie.load('user'),
            splits: this.state.splits
        }
        console.log(runnerData.user.uid);
        this.props.newTime(runnerData, this.props.selectedTeam, this.props.selectedTeam, this.props.selectedRunner);//needs to have selectedEventUID, and runnerUID
        this.props.setShow();
    }
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Runner Name</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Final Time</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "finalTime" type = "text" placeholder = "00:00:00"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Splits (optional)</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "splitDistance" type = "text" placeholder = "Distance" />
                            <Form.Control onChange = {this.handleChange} name = "splitUnit" as = "select">
                                <option hidden>Units</option>
                                <option>Miles</option>
                                <option>Kilometers</option>
                                <option>Meters</option>
                            </Form.Control>
                            <Form.Control onChange = {this.handleChange} name = "splitTime" type = "text" placeholder = "00:00:00"></Form.Control>
                            <Button variant = "primary" onClick = {this.handleAddSplits}>Add Split</Button>
                        </Form.Group>
                        <Button variant = "primary" >⇦</Button>
                        <Button variant = "primary" onClick = {this.handleAddResults}>Save Results</Button>
                        <Button variant = "primary" >⇨</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}
AddResultsModal.propTypes = {
    selectedEvent: PropTypes.string.isRequired,
    selectedTeam: PropTypes.string.isRequired,
    selectedRunner: PropTypes.string.isRequired,
    runners: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    newTime: PropTypes.func.isRequired,
}
const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        eventRunners: state.events.runners,
        selectedRunner:state.events.runners.selectedRunner,
        selectedEvent: state.events.selectedEvent,
        events: state.events.events
    }
}

export default connect(mapStateToProps, { newTime }) (AddResultsModal);
