import React, { Component } from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom';
import fire from '../Fire';
import cookie from 'react-cookies'
import '../css/login.css';
import stdlogo from "../resources/mLogoV2.svg"
import envelope from "../resources/mEnvelope.svg"
import lock from "../resources/mLock.svg"
import {Form, Card, Container} from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Login extends Component {
    constructor(props){
        super(props);

        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.failedLoginReset = this.failedLoginReset.bind(this);

        this.state = {
            // eslint-disable-next-line no-control-regex
            emailregex: new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])"),
            mercury_email: '',
            password: '',
            gotoTeamSelect: false,
            failedLogin: false,
        }
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        });
    }

    login = async (e) => {
        e.preventDefault();
        await fire.auth().signInWithEmailAndPassword(this.state.mercury_email, this.state.password).then(async (u) => {
            const idToken = await u.user.getIdToken(false);

            cookie.save('mercury-fb-token', idToken, { path: "/" });

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
        }).catch(() => {
            this.setState({
                failedLogin: true,
                failedLoginResetInterval:
                    setInterval(this.failedLoginReset, 1200)
            })
        });
    }

    failedLoginReset(){
        clearInterval(this.state.failedLoginResetInterval);
        this.setState({
            failedLogin: false
        })
    }

    render() {
        if(this.state.gotoTeamSelect){
            this.props.rerenderCallback();
            return <Redirect to='/teamselect'/>
        }

        let loginButtonClasses = ["login-submit-button"];
        if(this.state.failedLogin){
            loginButtonClasses.push("failed-login")
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

        let disableLoginButton;
        isEmailValid && isPasswordValid ? disableLoginButton = false : disableLoginButton = true;

        return (
            <Container className = "login-container">
                <Card className = "login-card-style">
                    <img className="login-logo" src = {stdlogo} alt="logo"/>
                    <hr/>
                    <h1 className="login-card-header">Coach Login</h1>
                    <Form className = "login-form">
                        <Col>
                            <Row className="justify-content-center mb-1">
                                <input
                                    className={emailInputClasses.join(' ')}
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    name="mercury_email"/>
                                <img src={envelope} alt="envelope" className="login-envelope"/>
                            </Row>
                            <Row className="justify-content-center">
                                <input
                                className={passwordInputClasses.join(' ')}
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                name="password"
                                id="login-password-input"
                                    />
                                <img src={lock} alt="lock" className="login-lock"/>
                            </Row>
                            <Row className="justify-content-center">
                                <button
                                    className={loginButtonClasses.join(' ')}
                                    onClick = {(e) => this.login(e)}
                                    type = 'submit'
                                    disabled={disableLoginButton}>LOGIN
                                </button>
                            </Row>
                        </Col>
                    </Form>
                    <Link to = "./signup" className="create-account-button">Create your Account ➔</Link>
                </Card>
            </Container>
        )
    }
}


export default withRouter(Login)