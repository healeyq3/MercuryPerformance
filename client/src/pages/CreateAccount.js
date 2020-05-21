import React, { Component } from 'react'
import fire from '../Fire';

import { Container, Form, Button } from 'react-bootstrap';
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

            fetch('/login/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: idToken,
                    name: this.state.name,
                    email: this.state.email,
                    uID: u.user.uid
                })
            });

            
        }).catch((error) => {
            console.log(error);
        });
        // window.location.href('./login');
    }
    
    
    render() {
        return (
            <Container fluid>
                <h1 className = "MercuryLogin">Mercury</h1>
                <h2>Create Account</h2>
                <div>
                <Form id = "createAccountForm" action = "/">
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
                     <Form.Group controlId = "enter">
                         <Button onClick = {this.createAccount} type = "submit">Create</Button>
                     </Form.Group>
                    </Form>
                </div>
            </Container>
        )
    }
}

export default CreateAccount
