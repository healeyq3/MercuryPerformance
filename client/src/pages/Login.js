import React, { Component } from 'react'
import {Link, Redirect, withRouter} from 'react-router-dom';
import fire from '../Fire';
import cookie from 'react-cookies'
import '../css/login.css';
import logo from "../resources/mLogoV2.svg"
import envelope from "../resources/mEnvelope.svg"
import lock from "../resources/mLock.svg"
//Bootstrap
import {Form, Card, Container} from 'react-bootstrap';
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";

class Login extends Component {
    constructor(props){
        super(props);
        this.login = this.login.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.state = {
            mercury_email: '',
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
        await fire.auth().signInWithEmailAndPassword(this.state.mercury_email, this.state.password).then(async (u) => {
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

        let disableLoginButton;
        this.state.mercury_email.length > 0 && this.state.password.length > 0 && (this.state.mercury_email.indexOf("@") < this.state.mercury_email.indexOf(".")) ? disableLoginButton = false : disableLoginButton = true;

        return (
            <Container className = "login-container">
                <Card className = "login-card-style">
                    <div className="login-logo-container">
                    </div>
                    <img className="login-logo" src = {logo} alt="logo"/>
                    <h1 className="login-card-header">Member Login</h1>
                    <Form className = "login-form">
                        <Col>
                            <Row className="justify-content-center mb-1">
                                <input
                                    className="form-input-login align-self-center"
                                    type="email"
                                    placeholder="Email"
                                    onChange={this.handleChange}
                                    value={this.state.email}
                                    name="mercury_email"/>
                                <img src={envelope} alt="envelope" className="login-envelope"/>
                            </Row>
                            <Row className="justify-content-center">
                                <input
                                    className="form-input-login align-self-center"
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
                                    className="login-submit-button"
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
