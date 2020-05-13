import React, { Component } from 'react'
import { Container, Button } from 'react-bootstrap'
import fire from '../Fire'
import NavBar from './NavBar';
import {withRouter} from 'react-router';

export class Settings extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }
    logout(){
        fire.auth().signOut().then();
    }
    render() {
        return (
            <Container fluid>
                <NavBar></NavBar>
                <h1>Settings</h1>
                <Button className = "signOut" variant = "light" onClick = {this.logout}>Sign Out</Button>
            </Container>
        )
    }
}

export default withRouter(Settings)
