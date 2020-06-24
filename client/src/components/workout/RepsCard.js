import React, { useImperativeHandle, useRef } from 'react';
import { DragSource, DropTarget } from 'react-dnd'
import {Row, Col, Card, Button} from 'react-bootstrap';
import { CARD_REP } from '../../dragTypes/workoutcreatortypes'


const RepsCard = React.forwardRef(
   ({rep, isDragging, connectDragSource, connectDropTarget }, ref) => {
       const elementRef = useRef(null)
       connectDragSource(elementRef)
       connectDropTarget(elementRef)
       const opacity = isDragging ? 0.5 : 1
       useImperativeHandle(ref, () => ({
           getNode: () => elementRef.current,
       }))
       return (
           <Card ref = {elementRef} style = {{opacity}} >
               <Row>
                    <Col>
                        <Card.Title>{rep.type}</Card.Title>
                    </Col>
                    <Col>
                        
                    </Col>
                    <Col>
                        {rep.hasOwnProperty('distance') === true ? <p>{rep.distance} {rep.distanceUnit}</p> : <p>{rep.hours}:{rep.minutes}:{rep.seconds}</p>}
                    </Col>
                    <Col>
                    <Col>
                        <p>{rep.percent}%</p>
                    </Col>
                        <Row>
                            <Button variant = "outline-primary">Edit</Button>
                            <Button variant = "outline-secondary">🗑</Button>
                        </Row>
                    </Col>
                </Row>
           </Card>
       )
   } 
)

export default DropTarget(
    CARD_REP,
    {
        hover(props, monitor, component){
            if (!component){
                return null
            }
            // node = HTML div element from imperative API
            const node = component.getNode()
            if(!node){
                return null
            }
            const dragIndex = monitor.getItem().index
            const hoverIndex = props.index
            // Don't replace items with themselves
            if (dragIndex === hoverIndex) {
                return
            }
            // Determine rectangle on screen
            const hoverBoundingRect = node.getBoundingClientRect()
            // Get vertical middle
            const hoverMiddleY =
                (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
            // Determine mouse position
            const clientOffset = monitor.getClientOffset()
            // Get pixels to the top
            const hoverClientY = clientOffset.y - hoverBoundingRect.top
            // Only perform the move when the mouse has crossed half of the items height
            // When dragging downwards, only move when the cursor is below 50%
            // When dragging upwards, only move when the cursor is above 50%
            // Dragging downwards
            if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
                return
            }
            // Dragging upwards
            if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
                return
            }
            // Time to actually perform the action
            props.moveCard(dragIndex, hoverIndex)
            // Note: we're mutating the monitor item here!
            // Generally it's better to avoid mutations,
            // but it's good here for the sake of performance
            // to avoid expensive index searches.
            monitor.getItem().index = hoverIndex
        },
    },
    (connect) => ({
        connectDropTarget: connect.dropTarget(),
    }),
)(
    DragSource(
        CARD_REP,
        {
            beginDrag: (props) => ({
                index: props.index
            })
        },
        (connect, monitor) => ({
            connectDragSource: connect.dragSource(),
            isDragging: monitor.isDragging(),
        })
    )(RepsCard),
)




// export class RepsCard extends Component {
//     render() {
        
//     }
// }



// return (
        //     <Card>
        //             <Row>
        //                 <Col>
        //                     <Card.Title>{this.props.rep.type}</Card.Title>
        //                 </Col>
        //                 <Col>
                            
        //                 </Col>
        //                 <Col>
        //                     {this.props.rep.hasOwnProperty('distance') === true ? <p>{this.props.rep.distance} {this.props.rep.distanceUnit}</p> : <p>{this.props.rep.hours}:{this.props.rep.minutes}:{this.props.rep.seconds}</p>}
        //                 </Col>
        //                 <Col>
        //                 <Col>
        //                     <p>{this.props.rep.percent}%</p>
        //                 </Col>
        //                 <Row>
        //                     <Button variant = "outline-primary">Edit</Button>
        //                     <Button variant = "outline-secondary">🗑</Button>
        //                     </Row>
        //                 </Col>
        //             </Row>
        //         </Card>    
        // )

// export default RepsCard
