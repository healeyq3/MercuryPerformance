import React, { Component } from 'react'
import {withRouter} from 'react-router';
// eslint-disable-next-line
import  { Container, Button, Navbar, Form } from 'react-bootstrap'
import PropTypes from 'prop-types';

export class AddRunner extends Component {
    state = {
        title : ""
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.AddRunner(this.state.title);
        this.setState = ({title : ''})
    }
    onChange = (e) => this.setState({[e.target.name] : e.target.value});
    render(){
    return (
        <Container fluid>
            <Form>
                     <Form.Group controlId = "controlInput2" onSubmit = {this.onSubmit}>
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control
                            type = "text"
                            name = "title"
                            placeholder = "John O'Brien"
                            value = {this.state.title}
                            onChange = {this.onChange}
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput1">
                        <Form.Label>Class</Form.Label>
                        <Form.Control 
                            type = "text"
                            placeholder = "Freshman"
                        />
                    </Form.Group>
                    <Form.Group controlId = "controlInput3">
                        <Form.Label>Workout Pace</Form.Label>
                        <Form.Control
                            type = "text"
                            placeholder = "00:00"
                        />
                    </Form.Group>
                     <Form.Group controlId = "enter">
                         <Button type = "submit">Add Runner</Button>
                     </Form.Group>
                    </Form>
        </Container>
    )
    }
    
}
AddRunner.propTypes = {
    Runners: PropTypes.array.isRequired
}

export default withRouter(AddRunner);
