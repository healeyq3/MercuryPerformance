import React, { Component } from 'react'
import fire from '../Fire';

import { Container, Form, Button, Navbar, Col, Card } from 'react-bootstrap';
// eslint-disable-next-line
import cookieParser from 'cookie-parser';
import cookie from 'react-cookies';

class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: '',
            email: '',
            password: ''
        }
        this.handleChange = this.handleChange.bind(this);
        this.createAccount = this.createAccount.bind(this);
    }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    async createAccount(e){
        e.preventDefault();
        await fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(async(u) => {
            const idToken = await u.user.getIdToken(false);

            cookie.save('idToken', idToken, { path: '/' });
            cookie.save('user', u.user, { path: '/' });

            await fetch('/login/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: idToken,
                    name: this.state.name,
                    email: this.state.email,
                    user: u.user
                })
            });

            
        }).catch((error) => {
            console.log(error);
        });

        await this.props.history.push('/teamselect');
        window.location.reload();
    }
    
    
    render() {
        return (
            <Container fluid className = "text-center">
                 <Navbar className = "navBarNav" bg="dark"  variant = 'dark' expand="lg">
                <Container>
                <Navbar.Brand href="/login" >Mercury</Navbar.Brand>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />  
                </Container>
            </Navbar>
            <Card className = "text-center">
                <Card.Header>Create Account</Card.Header>
                <Form id = "createAccountForm" action = "/">
                    <Col>
                     <Form.Group controlId = "controlInput2">
                        <Form.Label>Full Name</Form.Label>
                         <Form.Control
                             type = "text"
                             placeholder = "John Doe"
                             onChange = {this.handleChange}
                             value = {this.state.name}
                             name = "name"
                         />
                    </Form.Group>
                    <Form.Group controlId = "controlInput1">
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type = "email"
                            placeholder = "name@gmail.com"
                            onChange = {this.handleChange}
                            value = {this.state.email}
                            name = "email"
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput3">
                        <Form.Label>Enter Password: </Form.Label>
                        <Form.Control
                            type = "password"
                            value = {this.state.password}
                            onChange = {this.handleChange}
                            placeholder = "ex: 12345"
                            name = "password"
                        />
                    </Form.Group>
                    </Col>
                     <Form.Group controlId = "enter">
                         <Button onClick = {this.createAccount} type = "submit">Create</Button>
                     </Form.Group>
                    </Form>
                </Card>
            </Container>
        )
    }
}

export default CreateAccount
