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
            // eslint-disable-next-line no-control-regex
            nameregex: new RegExp("^([ \u00c0-\u01ffa-zA-Z'\\-])+$"),
            // eslint-disable-next-line no-control-regex
            emailregex: new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"),
            mercury_name: '',
            mercury_email: '',
            password: '',
            confirm_password: '',
            failedCreateAccount: false,
        }
        this.handleChange = this.handleChange.bind(this);
        this.createAccount = this.createAccount.bind(this);
        this.failedCreateAccountReset = this.failedCreateAccountReset.bind(this);
    }

    handleChange(e){
        this.setState({ [e.target.name] : e.target.value});
    }

    async createAccount(e){
        e.preventDefault();
        await fire.auth().createUserWithEmailAndPassword(this.state.mercury_email, this.state.password).then(async(u) => {
            const idToken = await u.user.getIdToken(false);

            cookie.save('mercury-fb-token', idToken, { path: "/", sameSite: "strict", SameSite:"strict" });

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
            })
            // .then(() => {
            //     this.props.rerenderCallback();
            //     var user = fire.auth().currentUser;
            //     user.sendEmailVerification().then(() => {
            //         //Email Sent
            //     }).catch(err => {
            //         //error occured
            //     })
            // })
        }).catch((error) => {
            console.log(error);
            this.setState({
                failedCreateAccount: true,
                failedCreateAccountResetInterval:
                    setInterval(this.failedCreateAccountReset, 1200)
            })
        });
        

    }

    failedCreateAccountReset(){
        clearInterval(this.state.failedCreateAccountResetInterval);
        this.setState({
            failedCreateAccount: false
        })
    }
    
    render() {
        let createButtonClasses = ["login-submit-button"];
        if(this.state.failedCreateAccount){
            createButtonClasses.push("failed-login")
        }

        let nameInputClasses = ["form-input-login", "align-self-center"];
        let emailInputClasses = ["form-input-login", "align-self-center"];
        let passwordInputClasses = ["form-input-login", "align-self-center"];
        let confirmPasswordInputClasses = ["form-input-login", "align-self-center"];

        let isNameValid = true;
        let isEmailValid = true;
        let isPasswordValid = true;

        if(!this.state.nameregex.test(this.state.mercury_name)){
            if(this.state.mercury_name.length > 0){
                nameInputClasses.push("invalid-input");
            }
            isNameValid=false;
        }

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

        if(this.state.password !== this.state.confirm_password){
            if(this.state.confirm_password.length>0){
                confirmPasswordInputClasses.push("invalid-input");
            }
            isPasswordValid=false;
        }

        let disableCreateAccountButton;
        isEmailValid && isPasswordValid && isNameValid ? disableCreateAccountButton = false : disableCreateAccountButton = true;

        return (
            <Container className = "login-container">
                <Card className = "login-card-style">
                    <img className="login-logo" src = {stdlogo} alt="logo"/>
                    <h1 className="login-card-header">Create Account</h1>
                    <Form className = "login-form">
                        <Col>
                            <Row className="justify-content-center mb-1">
                                <input
                                    className={nameInputClasses.join(' ')}
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
                                    className={confirmPasswordInputClasses.join(' ')}
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
