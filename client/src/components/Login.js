import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import fire from '../Fire';
import {withRouter} from 'react-router';
// eslint-disable-next-line
import {Button, Container, Row, Badge} from 'react-bootstrap';
import Form from 'react-bootstrap/Form';
import Col from 'react-bootstrap/Col';
import '../css/topOfScreen.css';

export class login extends Component {
    
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    login(e) {
        e.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(async (u) => {
            const idToken = await u.user.getIdToken(false);

            await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: idToken
                })
            });
        }).catch((error) => {
            console.log(error);
        })
    }

    signup(e){
        e.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).catch((error) => {
            console.log(error);
        })
    }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }
    
    
    render() {
        return (
            <Container fluid>
                <header className = "MercuryLogin">
                    <h1 className = "MercuryLogin">Mercury</h1>
                </header>
                <Form>
                    <Form.Group controlId = 'formBasicEmail'>
                        <Form.Label>Email Address:</Form.Label>
                        <Form.Control
                            type = "email"
                            placeholder = "Enter Email"
                            onChange = {this.handleChange}
                            value = {this.state.email}
                            name = "email"
                        />
                    </Form.Group>
                    <Form.Group controlId = "formBasicPassword">
                        <Form.Label>Password:</Form.Label>
                        <Form.Control
                        type = "password"
                        value = {this.state.password}
                        onChange = {this.handleChange}
                        placeHolder = "Enter Password"
                        name = "password"
                        />
                    </Form.Group>
                    <Row className = "justify-content-left">
                        <Col>
                            <Button type = 'submit' variant = "dark" onClick = {this.login}>Login</Button>
                            <Button variant = "light">
                                <Link to = "./CreateAccount">Create Account</Link>
                            </Button>
                        </Col>
                    </Row>
                </Form>
                
            </Container>
        )
    }
}

export default withRouter(login);


