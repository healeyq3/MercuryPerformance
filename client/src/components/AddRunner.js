import React from 'react'
import {withRouter} from 'react-router';
// eslint-disable-next-line
import  { Container, Button, Form, Modal } from 'react-bootstrap'


export class AddRunner extends React.Component {
    
    state = {
        title : "",
        show : false
    }
    
    showModal = e => {
        this.setState({
          show: !this.state.show
        });
      };
    render(){
    return (
        <Container fluid>
            <Form>
                     <Form.Group controlId = "enter">
                         <Button onClick={e => {this.showModal();}}>Add Runner</Button>
                     </Form.Group>
            </Form>
            <Modal show = {this.state.show} onHide = {this.showModal}>
            <Modal.Dialog  >
                <Modal.Header closeButton>Add Runner</Modal.Header>
                    <Modal.Body>
                    <Form>
                        <Form.Group controlId = "controlInput2" onSubmit = {this.onSubmit}>
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type = "text"
                                name = "title"
                                placeholder = "John O'Brien"
                                
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
                    <Modal.Footer>
                    <Form>
                        <Form.Group controlId = "enter">
                            <Button type = "submit" >Add Runner
                
                            </Button>
                        </Form.Group>
                        </Form>
                    </Modal.Footer>
                </Modal.Dialog>
                </Modal>
        </Container>
    )
    }
    
}


export default withRouter(AddRunner);
