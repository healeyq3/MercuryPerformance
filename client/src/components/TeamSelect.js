import React, { Component } from 'react'
import {app, auth} from 'firebase'
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
            teams: {}
        }
    }

    async getTeams(){
        const currUser = fire.auth().currentUser;
        if(!currUser)
            return null;

        currUser.getIdToken(false).then(async (idToken) => {
            await fetch('/teams', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    idToken: idToken,
                    user: currUser
                })
            }).then(async function(res){
                return await res.text();
            }).then(function(data){
                if(data.length>2){
                    const teams = JSON.parse(data);
                    for(const key in teams){
                        if (!teams.hasOwnProperty(key)) continue;
                        console.log(teams[key].teamName);
                        //key is the unique ID for each team
                        //teams[key] is the team object
                        //ex:
                        //  teams[key].teamName
                        //  teams[key].year
                    }
                }
            });
        });
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
        this.getTeams();
       /* let teamCards = this.state.teams.map(team => {
            return (
                <Col sm = "4">
                    <TeamSelectCard team = {team} />
                </Col>
            )
        }) */
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
                    <Row>
                        {/*teamCards*/}
                        <AddNewTeam onClick = {this.setShow}/>
                    </Row>
                    <CreateTeamModal setShow = {this.setShow} show = {this.state.show} />
                </Container>

        )
    }
}

export default withRouter(TeamSelect)
