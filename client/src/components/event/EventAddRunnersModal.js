import React, { Component } from '../../../node_modules/react'
import { Modal, Form, Button } from '../../../node_modules/react-bootstrap'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';
import { addRunnersToEvent } from "../../actions/eventActions";

export class EventAddRunnersModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            runnersToAddToFire: []
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        if(e.target.checked === true){
            let toAdd = e.target.value;
            if( this.state.runnersToAddToFire.length === 0){
                this.setState((state) => ({
                    runnersToAddToFire: [...state.runnersToAddToFire, toAdd]
                }));
            } else {
                this.setState((state) => ({
                    runnersToAddToFire: [...state.runnersToAddToFire, toAdd]
                }));
            }
        } else {
            if(this.state.runnersToAddToFire.includes(e.target.value)){
                const index = this.state.runnersToAddToFire.indexOf(e.target.value);
                this.state.runnersToAddToFire.splice(index, 1);
            }
        }
    }
    handleAddRunners = () => {
        this.props.addRunnersToEvent(this.state.runnersToAddToFire, this.props.selectedEvent);
        this.props.setShow();
    }

    reset = () => {
        this.setState({
            runnersToAddToFire: []
        })
    }

    render() {
        
        let runnerToAddArr = [];

        

        for(const runner in this.props.runners){
            if(this.props.runners.hasOwnProperty(runner)){
                if(this.props.events[this.props.selectedEvent].hasOwnProperty('runners') === false){
                    runnerToAddArr.push(
                        <Form.Group key = {this.props.runners[runner].key}>
                         <Form.Check type = 'checkbox' id = {this.props.runners[runner].key} >
                             <Form.Check.Input id = {this.props.runners[runner].key} type = 'checkbox' value = {this.props.runners[runner].key} onChange = {this.handleChange}/>
                             <Form.Check.Label>{this.props.runners[runner].name}</Form.Check.Label>
                         </Form.Check>
                     </Form.Group>
                    );
                } else if(this.props.events[this.props.selectedEvent].runners[this.props.runners[runner].key] !== undefined){} else {
                    runnerToAddArr.push(
                        <Form.Group key = {this.props.runners[runner].key}>
                         <Form.Check type = 'checkbox' id = {this.props.runners[runner].key} >
                             <Form.Check.Input id = {this.props.runners[runner].key} type = 'checkbox' value = {this.props.runners[runner].key} onChange = {this.handleChange}/>
                             <Form.Check.Label>{this.props.runners[runner].name}</Form.Check.Label>
                         </Form.Check>
                     </Form.Group>
                    )
                }
            }
        }

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow} onShow = {this.reset}>
            <Modal.Dialog>
                <Modal.Header closeButton>Add Runners</Modal.Header>
                <Modal.Body>
                    <Form>
                        {runnerToAddArr}
                        <Button variant = 'primary' onClick = {this.handleAddRunners}>Save Runners</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}

EventAddRunnersModal.propTypes = {
    selectedEvent: PropTypes.string.isRequired,
    runners: PropTypes.object.isRequired,
    events: PropTypes.object.isRequired,
    addRunnersToEvent: PropTypes.func.isRequired,
}

const mapStateToProps = function(state){
    return {
        runners: state.runners.runners,
        selectedEvent: state.events.selectedEvent,
        events: state.events.events,
    }
}

export default connect(mapStateToProps, { addRunnersToEvent }) (EventAddRunnersModal)