import React, { Component } from 'react'
import fire from '../Fire';
import {Container, Form, Button, Col, Card, Row} from 'react-bootstrap';
import cookie from 'react-cookies';
import '../css/login.css'
import stdlogo from "../resources/mLogoV2.svg";
import envelope from "../resources/mEnvelope.svg";

class CreateAccount extends Component {
    constructor(props) {
        super(props);

        this.state = {
            mercury_name: '',
            mercury_email: '',
            password: '',
            confirm_password: ''
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
            <Container className = "login-container">
                <Card className = "login-card-style">
                    <img className="login-logo" src = {stdlogo} alt="logo"/>
                    <h1 className="login-card-header">Create Account</h1>
                    <Form className = "login-form">
                        <Col>
                            <Row className="justify-content-center mb-1">
                                <input
                                    className="form-input-login align-self-center"
                                    type="name"
                                    placeholder="Full Name"
                                    onChange={this.handleChange}
                                    value={this.state.mercury_name}
                                    name="mercury_name"/>
                                <img src={envelope} alt="envelope" className="login-envelope"/>
                            </Row>
                            <Row className="justify-content-center mb-1">
                                <input
                                    className="form-input-login align-self-center"
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    value={this.state.mercury_email}
                                    name="mercury_email"/>
                                <img src={envelope} alt="envelope" className="login-envelope"/>
                            </Row>
                            <Row className="justify-content-center mb-1">
                                <input
                                    className="form-input-login align-self-center"
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    name="password"/>
                                <img src={envelope} alt="envelope" className="login-envelope"/>
                            </Row>
                            <Row className="justify-content-center">
                                <input
                                    className="form-input-login align-self-center"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                    value={this.state.confirm_password}
                                    name="confirm_password"/>
                                <img src={envelope} alt="envelope" className="login-envelope"/>
                            </Row>
                        </Col>
                    </Form>
                </Card>
            </Container>
        )
    }
}

export default CreateAccount
