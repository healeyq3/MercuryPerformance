import React, { Component } from 'react'
import { Card, Row, Col } from 'react-bootstrap';
export class ExistingTeamCard extends Component {
    
    render() {
        const runnerCount = (this.props.team.runners) ? Object.keys(this.props.team.runners).length : 0;
        return (
        <Card className = "teamselect-teamcard" tag="a" onClick={() => this.props.onSelect(this.props.team)} href = './'>
            <Card.Body>
                <Card.Title>{this.props.team.teamName}</Card.Title>
                <Card.Subtitle>{this.props.team.year}</Card.Subtitle>
                <hr/>
                <Card.Subtitle className = "teamselect-runnercount">{runnerCount}</Card.Subtitle>
                <Row>
                <Col>
                {/*<Card.Link style = {{cursor:"auto"}} href = './' onClick={() => this.props.onSelect(this.props.team)}>Edit Team</Card.Link>*/}
                </Col>
                <Col>
                {/*<Card.Link style = {{cursor:"auto"}}>🗑</Card.Link>*/}
                </Col>
                </Row>
            </Card.Body>
        </Card>
        )
    }
}

export default ExistingTeamCard;
