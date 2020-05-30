import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'reactstrap';

// {tripData.map((element) => <p>{`${element}: ${tripData[element]}`}</p>)}

const RestartForm = ({ tripData, onReset }) => {
  const formatTime = (timeInSeconds) => new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  const formatDistance = (distanceInMeters) => `${parseInt(distanceInMeters) / 1000} km`;

  return (
    <Card style={{ padding: '1rem' }} className="shadow-lg rounded">
      {console.log(tripData)}
      <Row>
        <Col>
          <h3>Original trip</h3>
          <br />
          <p>
            Original Distance: <b>{formatDistance(tripData.originalDistance)}</b>
          </p>
          <p>
            Original Trip Duration: <b>{formatTime(tripData.originalDuration)}</b>
          </p>
          <br />
        </Col>
      </Row>
      <Row>
        <Col>
          <h3>Proposed trip</h3>
          <br />
          <p>
            Proposed Trip Distance: <b>{formatDistance(tripData.finalDistance)}</b>
          </p>
          <p>
            Proposed Trip Duration: <b>{formatTime(tripData.finalDuration)}</b>
          </p>
          <br />
        </Col>
      </Row>
      <Button onClick={() => onReset()} color="primary">
        Plan trip again
      </Button>
    </Card>
  );
};

RestartForm.propTypes = {
  tripData: PropTypes.object.isRequired,
  onReset: PropTypes.func.isRequired,
};

export default RestartForm;
