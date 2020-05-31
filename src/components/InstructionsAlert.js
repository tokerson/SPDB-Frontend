import React from 'react';
import { UncontrolledAlert } from 'reactstrap';

// Alert displayed with basic instructions on how to use the application.

const InstructionsAlert = () => {
  return (
    <UncontrolledAlert color="info" style={{ width: '100%' }}>
      <h3>Welcome to your trip planner.</h3>
      <br/>
      <p>
        You can choose the <b>origin</b> of your trip by clicking a place on the map using left mouse
        button.
      </p>
      <p>
        Similarly you can choose the <b>destination</b> of your trip by  using right mouse
        button.
      </p>
      <br/>
      <p>In order to customize the trip, feel free to fill in the form according to your needs.</p>
    </UncontrolledAlert>
  );
};
export default InstructionsAlert;
