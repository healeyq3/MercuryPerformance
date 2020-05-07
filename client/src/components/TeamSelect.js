import React, { Component } from 'react'
import fire from '../Fire'
import {withRouter, Router} from 'react-router';
import  { Container, Button } from 'react-bootstrap'

export class TeamSelect extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
    }

    logout(){
        fire.auth().signOut();
    }
    
    render() {
        return (
                <Container fluid>
                    <header className = "MercuryHome">
                        <h1 className ="teamSelect">Team Select</h1>
                    </header>
                    <Button className = "addTeam" type = "button" variant = "dark">
                    Add Team
                    </Button>
                    <Button className = "signOut" variant = "light" onClick = {this.logout}>
                        Sign Out
                    </Button>
                    
                        
                        <ul className = "teams" id = "teams">
                        <li className = "team" style = {{fontSize: 20, margin : 2}}>
                            <a href = "./Home">Team Name</a>
                            </li>
                    </ul>
                   
                 
                </Container>

        )
    }
}

export default withRouter(TeamSelect)
