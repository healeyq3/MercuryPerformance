import React, { Component } from 'react'
import fire from '../Fire'
import {withRouter} from 'react-router';
import  { Container, Button, Row, Col } from 'react-bootstrap'
import {TeamSelectCard} from './TeamSelectCard';
import AddNewTeam from './AddNewTeam';
import '../css/PopupStyle.css';
import CreateTeamModal from './CreateTeamModal';


export class TeamSelect extends Component {
    constructor(props) {
        super(props);
        this.logout = this.logout.bind(this);
        this.state = {
            show: false,
        }
    }

 

    logout(){
        fire.auth().signOut().then();
    }

    setShow = e => {
        this.setState({
            show: !this.state.show
        })
    }
    
    render() {
        return (
                <Container fluid = "true">
                    <header className = "MercuryHome">
                        <Row fluid = "true">
                            <Col xs = {10}>
                                <h1 className ="teamSelect">Team Select</h1>
                            </Col>
                            <Col>
                                <Button className = "signOut" variant = "light" onClick = {this.logout}>Sign Out</Button>
                            </Col>
                        </Row>
                    </header>
                    <TeamSelectCard onClick = {this.setShow}/>
                    <AddNewTeam onClick = {this.setShow}/>
                    <CreateTeamModal setShow = {this.setShow} show = {this.state.show} />
                </Container>

        )
    }
}

export default withRouter(TeamSelect)
