import React, { Component } from 'react'
// eslint-disable-next-line
import {Button, Container, Row, Badge} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import '../css/topOfScreen.css';


export class CreateAccount extends Component {
    render() {
        return (
            <Container fluid>
                <h1 className = "MercuryLogin">Mercury</h1>
                <h2>Create Account</h2>
                <div>
                <Form>
                     <Form.Group controlId = "controlInput2">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "John O'Brien"
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput1">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control 
                            type = "email"
                            placeholder = "name@gmail.com"
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput3">
                        <Form.Label>Enter Password: </Form.Label>
                        <Form.Control
                            type = "password"
                            placeholder = "ex: 12345"
                        />
                    </Form.Group>
                     <Form.Group controlId = "enter">
                         <Button type = "submit">Create</Button>
                     </Form.Group>
                    </Form>
                </div>
            </Container>
        )
    }
}

export default CreateAccount;