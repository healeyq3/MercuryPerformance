import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import fire from '../Fire';
import cookie from 'react-cookies'

//Bootstrap
import {Button, Container, Row, Form, Col} from 'react-bootstrap';

class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: ''
        }
    }

    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        });
    }

    login = async (e) => {
        e.preventDefault();
        await fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(async (u) => {
            const idToken = await u.user.getIdToken(false);

            cookie.save('idToken', idToken, { path: "/" });
            cookie.save('user', u.user, { path: "/" });

            await fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: idToken,
                    user: u.user
                })
            });
        }).catch((error) => {
            console.log(error);
        });

        await this.props.history.push('teamselect');
        window.location.href="./";
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
                        placeholder = "Enter Password"
                        name = "password"
                        />
                    </Form.Group>
                    <Row className = "justify-content-left">
                        <Col>
                        
                            <Button 
                            onClick = {this.login} 
                            type = 'submit' 
                            variant = "dark" >Login</Button>
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


export default Login
