import React, { Component } from 'react'
import {withRouter} from 'react-router';
// eslint-disable-next-line
import  { Container, Button, Navbar, Form, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types';
import AddRunnerModal from "./AddRunnerModal"

export class AddRunner extends Component {
    
    state = {
        title : "",
        modelIsOpen : false
    }
    
    onSubmit = (e) => {
        e.preventDefault();
        this.props.AddRunner(this.state.title);
        this.setState = ({title : ''})
    }
    setShow = () => {
        console.log(this.show)
        this.show = false;
        console.log('hello')
        console.log(this.show)
    }
    toggleModal = () =>{
        this.setState({
        modelIsOpen : !this.state.modelIsOpen
        })
    }
    onChange = (e) => this.setState({[e.target.name] : e.target.value});
    render(){
    return (
        <Container fluid>
            <Form>
                     <Form.Group controlId = "enter">
                         <Button type = "submit" onClick = {this.toggleModal.bind(this)}>Add Runner
            
                         </Button>
                     </Form.Group>
                     <Modal isOpen = {this.state.modelIsOpen}>
                     <Modal.Dialog hidden = {this.props.setShow} scrollable = {true} >
                <Modal.Header toggle = {this.toggleModal.bind(this)}>Add Runner</Modal.Header>
                <Modal.Body>
                <Form>
                     <Form.Group controlId = "controlInput2" onSubmit = {this.onSubmit}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type = "text"
                            name = "title"
                            placeholder = "John O'Brien"
                            
                            onChange = {this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput1">
                        <Form.Label>Class</Form.Label>
                        <Form.Control 
                            type = "text"
                            placeholder = "Freshman"
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput3">
                        <Form.Label>Workout Pace</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "00:00"
                        />
                    </Form.Group>
                    </Form>
                </Modal.Body>
          </Modal.Dialog>
            </Modal>
                     
                    </Form>
        </Container>
    )
    }
    
}
AddRunner.propTypes = {
    Runners: PropTypes.array.isRequired
}

export default withRouter(AddRunner);
