import React, { Component } from 'react'
import { Modal } from 'react-bootstrap';
import CreateTeam from './CreateTeam';

export class CreateTeamModal extends React.Component {
    constructor(props, ref){
        super(props);
    }
    
    
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Create New Team</Modal.Header>
                <Modal.Body>
                    <CreateTeam />
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}

export default CreateTeamModal
