import React, { Component } from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom';
import fire from '../Fire';
import cookie from 'react-cookies'

import '../css/login.css';

//Bootstrap
import {Button, Row, Form, Col, Card, Container} from 'react-bootstrap';

class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
            gotoTeamSelect: false
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

            fetch('/api/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: idToken
                })
            }).then(() => {
                this.setState({
                    gotoTeamSelect: true
                })
            })
        }).catch((error) => {
            console.log(error);
        });
    }

    render() {
        if(this.state.gotoTeamSelect){
            return <Redirect to='/teamselect'/>
        }

        return (
            <Container fluid className = "login-container">
            <Card className = "card-style">
                <Card.Header className = "formHeader">Login</Card.Header>
                <Form>
                    <Col>
                    <Form.Group className = "formInputHeader" controlId = 'formBasicEmail'>
                        <Form.Label>Email Address</Form.Label>
                        <Form.Control
                            type = "email"
                            placeholder = "johndoe@gmail.com"
                            onChange = {this.handleChange}
                            value = {this.state.email}
                            name = "email"
                        />
                    </Form.Group>
                    <Form.Group className = "formInputHeader" controlId = "formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                        type = "password"
                        value = {this.state.password}
                        onChange = {this.handleChange}
                        placeholder = "Password"
                        name = "password"
                        />
                    </Form.Group>
                    </Col>
                    <Row className = "justify-content-left">
                        <Col>
                            <Button
                            onClick = {(e) => this.login(e)}
                            type = 'submit' 
                            variant = "flat" >Login</Button>
                        </Col>
                    </Row>
                </Form>
                <p>

                </p>
            </Card>
            <Row className = "login-supplementalbuttons">
              <Col>
                <Link to = "">Forgot Password?</Link>
              </Col>
              <Col>
              <Link to = "./signup">New User</Link>
              </Col>
            </Row>
                
            </Container>
        )
    }
}


export default withRouter(Login)
