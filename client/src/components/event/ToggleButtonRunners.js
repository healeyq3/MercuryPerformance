import React, { useState } from 'react';
import { ToggleButton, ToggleButtonGroup } from 'react-bootstrap';

function ToggleButtonRunners() {
    const [value, setValue] = useState([1, 3]);
  
    /*
     * The second argument that will be passed to
     * `handleChange` from `ToggleButtonGroup`
     * is the SyntheticEvent object, but we are
     * not using it in this example so we will omit it.
     */
    const handleChange = (val) => setValue(val);
  
    return (
      <ToggleButtonGroup type = 'checkbox' value={value} onChange={handleChange} vertical>
        <ToggleButton value={1} variant = 'outline-primary'>James Taylor</ToggleButton>
        <ToggleButton value={2} variant = 'outline-primary'>Phallic Member</ToggleButton>
        <ToggleButton value={3} variant = 'outline-primary'>Howie Schmultz</ToggleButton>
      </ToggleButtonGroup>
      
    );
  };

  export default ToggleButtonRunners;