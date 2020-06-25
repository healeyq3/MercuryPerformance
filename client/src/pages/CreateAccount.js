import React, { Component } from 'react'
import fire from '../Fire';
import {Container, Form, Col, Card, Row} from 'react-bootstrap';
import cookie from 'react-cookies';
import '../css/login.css'
import stdlogo from "../resources/mLogoV2.svg";
import envelope from "../resources/mEnvelope.svg";
import lock from "../resources/mLock.svg"
import person from "../resources/mPerson.svg";
import {Link} from "react-router-dom";

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
        await fire.auth().createUserWithEmailAndPassword(this.state.mercury_email, this.state.password).then(async(u) => {
            const idToken = await u.user.getIdToken(false);

            cookie.save('idToken', idToken, { path: '/' });
            cookie.save('user', u.user, { path: '/' });

            await fetch('api/login/new', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: idToken,
                    name: this.state.mercury_name,
                    email: this.state.mercury_email
                })
            });
        }).catch((error) => {
            console.log(error);
        });

        await this.props.history.push('/teamselect');
        window.location.reload();
    }
    
    
    render() {

        let createButtonClasses = ["login-submit-button"];
        if(this.state.failedLogin){
            createButtonClasses.push("failed-login")
        }

        let emailInputClasses = ["form-input-login", "align-self-center"];
        let passwordInputClasses = ["form-input-login", "align-self-center"];

        let isEmailValid = true;
        let isPasswordValid = true;

        if(!this.state.emailregex.test(this.state.mercury_email)){
            if(this.state.mercury_email.length > 0){
                emailInputClasses.push("invalid-input");
            }
            isEmailValid=false;
        }
        if(this.state.password.length<6){
            if(this.state.password.length>0){
                passwordInputClasses.push("invalid-input");
            }
            isPasswordValid=false;
        }

        let disableCreateAccountButton;
        isEmailValid && isPasswordValid ? disableCreateAccountButton = false : disableCreateAccountButton = true;

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
                                <img src={person} alt="envelope" className="login-person"/>
                            </Row>
                            <Row className="justify-content-center mb-1">
                                <input
                                    className={emailInputClasses.join(' ')}
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    value={this.state.mercury_email}
                                    name="mercury_email"/>
                                <img src={envelope} alt="envelope" className="login-envelope"/>
                            </Row>
                            <Row className="justify-content-center mb-1">
                                <input
                                    className={passwordInputClasses.join(' ')}
                                    type="password"
                                    placeholder="Password"
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    name="password"/>
                                <img src={lock} alt="envelope" className="login-lock"/>
                            </Row>
                            <Row className="justify-content-center">
                                <input
                                    className="form-input-login align-self-center"
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={this.handleChange}
                                    value={this.state.confirm_password}
                                    name="confirm_password"/>
                                <img src={lock} alt="envelope" className="login-lock"/>
                            </Row>
                            <Row className="justify-content-center">
                                <button
                                    className={createButtonClasses.join(' ')}
                                    onClick = {(e) => this.createAccount(e)}
                                    type = 'submit'
                                    disabled={disableCreateAccountButton}>CREATE ACCOUNT
                                </button>
                            </Row>
                        </Col>
                    </Form>
                    <Link to = "./login" className="create-account-button">Return</Link>
                </Card>
            </Container>
        )
    }
}

export default CreateAccount
