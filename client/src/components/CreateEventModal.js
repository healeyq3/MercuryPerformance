import React, { Component } from 'react'

export class CreateEventModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            eventName: '',
            eventDate: '',
        }
        this.handleChange = this.handleChange.bind(this);
    }
    
    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    render() {
        return (
            <Modal show = {this.props.show} onHide = {this.props.setShow}>
            <Modal.Dialog>
                <Modal.Header closeButton>Create New Event</Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group>
                            <Form.Label>Event Name</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "eventName" type = "text" placeholder = "Enter Event Name"/>
                        </Form.Group>
                        <Form.Group>
                            <Form.Label>Date</Form.Label>
                            <Form.Control onChange = {this.handleChange} name = "eventDate" type = "text" placeholder = "00/00/00" />
                        </Form.Group>
                        <Button variant = "primary">Add Event</Button>
                    </Form>
                </Modal.Body>
            </Modal.Dialog>
            </Modal>
        )
    }
}

export default CreateEventModal
//export default connect(null, { newEvent }) (CreateEventModal);
