import React, { Component } from 'react'
import {withRouter} from 'react-router';
// eslint-disable-next-line
import  { Container, Button, Navbar, Form, Modal } from 'react-bootstrap'
import PropTypes from 'prop-types';
import AddRunnerModal from "./AddRunnerModal"

export class AddRunner extends Component {
    state = {
        title : ""
    }
    onSubmit = (e) => {
        e.preventDefault();
        this.props.AddRunner(this.state.title);
        this.setState = ({title : ''})
    }
    setShow = () => {
        console.log(this.show)
        this.show = false;
        console.log('hello')
        console.log(this.show)
    }
    onChange = (e) => this.setState({[e.target.name] : e.target.value});
    render(){
    return (
        <Container fluid>
            <Form>
                     <Form.Group controlId = "enter">
                         <Button type = "submit" onClick = {this.setShow}>Add Runner
            
                         </Button>
                     </Form.Group>
                     <AddRunnerModal setShow = {this.show}/>
                     
                    </Form>
        </Container>
    )
    }
    
}
AddRunner.propTypes = {
    Runners: PropTypes.array.isRequired
}

export default withRouter(AddRunner);
