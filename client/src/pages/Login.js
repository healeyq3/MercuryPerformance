import React, { Component } from 'react'
import {Redirect, withRouter} from 'react-router-dom';
import fire from '../Fire';
import cookie from 'react-cookies'
import '../css/login.css';
import logo from "../resources/mLogoV2.svg"
//Bootstrap
import {Form, Card, Container} from 'react-bootstrap';
import Col from "react-bootstrap/Col";

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

        return (
            <Container className = "login-container">
                <Card className = "login-card-style">
                    <div className="login-logo-container">
                    </div>
                    <img className="login-logo" src = {logo} alt="logo"/>
                    <h1 className="login-card-header">LOG IN</h1>
                    <Form className = "login-form">
                        <Col>
                            <input
                                className="form-input-login"
                                type="email"
                                placeholder="Email"
                                onChange={this.handleChange}
                                value={this.state.email}
                                name="mercury_email"/>
                            <input
                                className="form-input-login"
                                type="password"
                                placeholder="Password"
                                onChange={this.handleChange}
                                value={this.state.password}
                                name="password"
                                id="login-password-input"
                            />
                        </Col>
                        <div className="login-submit-button-container">
                            <button
                                className="login-submit-button"
                                onClick = {(e) => this.login(e)}
                                type = 'submit'>Login
                            </button>
                        </div>
                    </Form>
                    <p>

                    </p>
                </Card>
                {/*<Row className = "login-supplementalbuttons">*/}
                {/*  <Col>*/}
                {/*    <Link to = "">Forgot Password?</Link>*/}
                {/*  </Col>*/}
                {/*  <Col>*/}
                {/*  <Link to = "./signup">New User</Link>*/}
                {/*  </Col>*/}
                {/*</Row>*/}
            </Container>
        )
    }
}


export default withRouter(Login)
