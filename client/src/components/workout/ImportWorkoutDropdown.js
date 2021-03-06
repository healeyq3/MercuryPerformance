import React, {Fragment} from 'react'
import {Container, Button, Modal} from 'react-bootstrap'
import {Typeahead} from 'react-bootstrap-typeahead';
import "../../css/importdropdown.css"
import 'react-bootstrap-typeahead/css/Typeahead.css';

export class ImportWorkoutDropdown extends React.Component {
  constructor(props){
    super(props);

    this.state = {
      selected: "",
      disableImportBtn: true
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleImportWorkout = this.handleImportWorkout.bind(this);
  }

  handleChange(e){
    this.setState({ [e.target.name] : e.target.value});
  }

  handleImportWorkout(){
    console.log("Importing "+this.state.selected);
    this.props.importWorkoutBlueprint(this.state.selected);
  }

  render(){
    if(!this.props.allBlueprints){
      return null;
    }

    let options = [];
    let workoutUids = Object.keys(this.props.allBlueprints);
    for(const index in workoutUids){
      if(this.props.blueprints[workoutUids[index]]){
        continue;
      }
      options.push({
        workoutuid: workoutUids[index],
        label: this.props.allBlueprints[workoutUids[index]].name
      })
    }

    console.log("Button should be disabled: "+this.state.disableImportBtn);
    return (
      <Container fluid>
        <Modal.Header closeButton>Import Workout</Modal.Header>
        <Modal.Body>
          <Fragment>
            <Typeahead
              onChange={(selected) => {
                if(selected[0]){
                  console.log("Setting to " + selected[0].workoutuid);
                  this.setState({selected: selected[0].workoutuid});
                  this.setState({
                    disableImportBtn: false
                  })
                } else {
                  this.setState({
                    disableImportBtn: true
                  })
                }
              }}
              id = "import-workout-dropdown"
              placeholder="Choose a workout..."
              options = {options}
            />
          </Fragment>
          <Button disabled = {this.state.disableImportBtn} id = "import-workout-btn" className = "btn-import" variant = "primary" onClick = {this.handleImportWorkout}>Import Workout</Button>
        </Modal.Body>
      </Container>
    )
  }

}

export default ImportWorkoutDropdown
