import React, { Component } from 'react'
<<<<<<< HEAD
//eslint-disable-next-line
import { app } from 'firebase'
import fire from '../Fire'
//eslint-disable-next-line
=======
import fire from '../Fire'
>>>>>>> fbb32cb42e71dcc12a2e5a8e30ff4106f98a68b2
import {withRouter, Router} from 'react-router';
import  { Card, Badge, Container, Button } from 'react-bootstrap'
import {TeamSelectCard} from './TeamSelectCard';
import AddNewTeam from './AddNewTeam';

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
                        <Button className = "signOut" variant = "light" onClick = {this.logout}>
                        Sign Out
                    </Button>
                    </header>
                    <TeamSelectCard />
                    <AddNewTeam />
                 
                </Container>

        )
    }
}

export default withRouter(TeamSelect)
