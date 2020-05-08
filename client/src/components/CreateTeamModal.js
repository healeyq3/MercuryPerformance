import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import CreateTeam from './CreateTeam';

export class CreateTeamModal extends Component {
    constructor(props){
        super(props);
    }
    
    
    render() {
        return (
            <Modal.Dialog hidden = {this.props.setShow} scrollable = {true}>
                <Modal.Header>Create New Team</Modal.Header>
                <Modal.Body>
                    <CreateTeam />
                </Modal.Body>
            </Modal.Dialog>
        )
    }
}

export default CreateTeamModal
