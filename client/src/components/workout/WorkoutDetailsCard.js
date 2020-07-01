import React, { Component } from 'react'
import {Row, Col, Card} from 'react-bootstrap'

export class WorkoutDetailsCard extends Component {
    render() {
        let time = 0;
        for(const rep in this.props.workout.reps){
            if(rep.hasOwnProperty('duration')){
                time +=rep.duration
                console.log(time)
            }
            else{
                cardItems.push(
                        <React.Fragment>
                        <Card className = "text-center" style = {{ height: '10%', orientation: 'horizontal'}}>
                        <Card.Title>{rep.type}</Card.Title>
                        <Card.Subtitle>{rep.distance}</Card.Subtitle>
                        </Card>
                        </React.Fragment>
                    
                )
            }
        }
        return (
            <Card>
            {cardItems}
            </Card> 
        )
    }
}

export default WorkoutDetailsCard
