import React, { Component } from 'react'
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import fire from '../Fire';
import {withRouter} from 'react-router';

//Bootstrap
import {Button, Container, Row, Form, Col} from 'react-bootstrap';

class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            email: '',
            password: '',
            loading: false,
            errors: {}
        }
    }

    handleChange = (e) => {
        this.setState({
           [e.target.name]: e.target.value
        });
    }

    login = (e) => {
        e.preventDefault();
        this.setState({
            loading: true
        })
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

             await this.props.history.push('teamselect') ;
             
        }).catch((error) => {
            this.setState({
                error: error.response.data,
                loading: false
            })
        });
    }

    render() {
        const {classes} = this.props;
        const {errors, loading} = this.state;
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

Login.propTypes = {
    classes: PropTypes.object.isRequired
}

export default withRouter(Login)
