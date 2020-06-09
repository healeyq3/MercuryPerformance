import React, { Component } from '../../../node_modules/react'
import { Modal, Form } from '../../../node_modules/react-bootstrap'
import { cookie } from '../../../node_modules/react-cookies'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

export class EventAddRunnersModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            runners: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    handleAddRunners = () => {
        const runnersData = {
            user: cookie.load('user'),
            runners: this.state.runners
        }
        this.props.addEventRunners(runnersData, this.props.teamUID);//need to pass in selectedTeamUID here
        this.props.setShow();
    }

    render() {
        
        let runnerArr = [];

        for (const runner in this.props.runners) {
            if(this.props.runners.hasOwnProperty(runner)){
                runnerArr.push(
                    <Form.Group key = {this.props.runners[runner].key}>
                        <Form.Check type = 'checkbox' id = {this.props.runners[runner].key} onClick = {console.log('toggled')}>
                            <Form.Check.Input type = 'checkbox' checked />
                            <Form.Check.Label>{this.props.runners[runner].name}</Form.Check.Label>
                        </Form.Check>
                    </Form.Group>
                )
            }
        }

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Add Runners</Modal.Header>
                <Modal.Body>
                    <Form>
                        {runnerArr}
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}

EventAddRunnersModal.propTypes = {
    selectedEvent: PropTypes.string.isRequired,
    runners: PropTypes.object.isRequired
}

const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        selectedEvent: state.events.selectedEvent
    }
}

export default connect(mapStateToProps, {}) (EventAddRunnersModal)