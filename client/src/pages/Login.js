import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import fire from '../Fire';
import cookie from 'react-cookies'
import { withRouter } from "react-router-dom";

//Bootstrap
import {Button, Navbar, Row, Form, Col, Card, Container} from 'react-bootstrap';

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
                    idToken: idToken
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
                <Card.Header>Login</Card.Header>
                <Form>
                    <Col>
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
                    </Col>
                    <Row className = "justify-content-left">
                        <Col>
                            <Button
                            onClick = {this.login} 
                            type = 'submit' 
                            variant = "dark" >Login</Button>
                        </Col>
                    </Row>
                </Form>
                <p>

                </p>
            </Card>
            <Row className = "justify-content-left">
                        <Col>
                        <Link to = "./signup">New User</Link>
                        </Col>
                    </Row>
                
            </Container>
        )
    }
}


export default withRouter(Login)
