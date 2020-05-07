import React, { Component } from 'react'
//eslint-disable-next-line
import { app } from 'firebase'
import fire from '../Config/Fire'
//eslint-disable-next-line
import {withRouter, Router} from 'react-router';
// eslint-disable-next-line
import  { Card, Badge, Container, Button } from 'react-bootstrap'
//eslint-disable-next-line
import { Link } from 'react-router-dom';
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
