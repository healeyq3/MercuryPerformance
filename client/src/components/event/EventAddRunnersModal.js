import React, { Component } from '../../../node_modules/react'
import { Modal, Form } from '../../../node_modules/react-bootstrap'
import { cookie } from '../../../node_modules/react-cookies'
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
    
    handleChange(e){ // no matter what I do, whether try to add directly or hard copy then replace, will change runnersToAddToFire
        console.log(e.target.value)
        console.log(e.target.checked)
        if(e.target.checked === true){
            let toAdd = e.target.value;
            const toAddArray = [];//no point in this array, gets reset every time
            if(this.runnersToAddToFire === undefined){
                toAddArray.push(toAdd);
            } else {
                this.runnersToAddToFire.map((key) => toAddArray.push(key))
            }
            this.setState({
                //runnersToAddToFire: this.state.runnersToAddToFire.concat([toAdd])
               // runnersToAddToFire: toAddArray //Aidan look right here
                //runnersToAddToFire:[...prevState.runnersToAddToFire, toAdd]
                runnersToAddToFire:[1,2]//Set state either isn't running or something is wrong with our state
            })
            console.log(this.state.runnersToAddToFire + " Array");
        } else if(this.runnersToAddToFire === undefined){
            console.log('still empty');
        } 
        else {
            if(this.runnersToAddToFire.includes(e.target.value)){
                const index = this.runnersToAddToFire.indexOf(e.target.value);
                const toReturn = this.runnersToAddToFire.splice(index, 1);
                this.setState({
                    runnersToAddToFire: toReturn
                });
            }
        }
        console.log('Array' + this.runnersToAddToFire);

    }
    handleAddRunners = () => {
        const runnersData = {
            user: cookie.load('user'),
            runners: this.state.runners
        }
        this.props.addRunnersToEvent(runnersData, this.props.teamUID);//need to pass in selectedTeamUID here
        this.props.setShow();
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
                } else if(this.props.events[this.props.selectedEvent].runners[this.props.runners[runner].key] !== undefined){
                    console.log('reached else if statement');
                    console.log(this.props.runners[runner].key);
                    console.log(this.props.events[this.props.selectedEvent].runners[this.props.runners[runner].key]);
                } else {
                    runnerToAddArr.push(
                        <Form.Group key = {this.props.runners[runner].key}>
                         <Form.Check type = 'checkbox' id = {this.props.runners[runner].key} >
                             <Form.Check.Input id = {this.props.runners[runner].key} type = 'checkbox' value = {this.props.runners[runner].key}onChange = {this.handleChange}/>
                             <Form.Check.Label>{this.props.runners[runner].name}</Form.Check.Label>
                         </Form.Check>
                     </Form.Group>
                    )
                }
            }
        }

        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Add Runners</Modal.Header>
                <Modal.Body>
                    <Form>
                        {runnerToAddArr}
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
        events: state.events.events
    }
}

export default connect(mapStateToProps, { addRunnersToEvent }) (EventAddRunnersModal)