import React from 'react';
import PropTypes from 'prop-types';
import { Card, Button, Row, Col } from 'reactstrap';

// {tripData.map((element) => <p>{`${element}: ${tripData[element]}`}</p>)}

const RestartForm = ({ tripData, onReset }) => {
  const formatTime = (timeInSeconds) => new Date(timeInSeconds * 1000).toISOString().substr(11, 8);
  const formatDistance = (distanceInMeters) => `${parseInt(distanceInMeters) / 1000} km`;

  return (
    <Card style={{ padding: '1rem' }} className="shadow-lg rounded">
      <h3>Original trip</h3>
      <br />
      <p>
        Original Distance: <b>{formatDistance(tripData.originalDistance)}</b>
      </p>
      <p>
        Original Trip Duration: <b>{formatTime(tripData.originalDuration)}</b>
      </p>
      <hr />
      <h3>Proposed trip</h3>
      <br />
      <p>
        Proposed Trip Distance: <b>{formatDistance(tripData.finalDistance)}</b>
      </p>
      <p>
        Proposed Trip Duration: <b>{formatTime(tripData.finalDuration)}</b>
      </p>
      <hr />
      <h3>Search parameters</h3>
      <br />
      <p>
        Max. time spent in one place: <b>{formatTime(tripData.parameters.timeInPoi)}</b>
      </p>
      <p>
        Min. rating of a plce: <b>{tripData.parameters.minimalRating}</b>
      </p>
      <p>
        Max. time added to trip time: <b>{formatTime(tripData.parameters.additionalTime)}</b>
      </p>
      <p>
        Max. distance added to trip distance:{' '}
        <b>{formatDistance(tripData.parameters.additionalDistance)}</b>
      </p>
      <p>
        Min. first stop time: <b>{formatTime(tripData.parameters.searchingStart)}</b>
      </p>
      <p>
        Places categories:{' '}
        <b>
          {tripData.parameters.categories.length > 0
            ? tripData.parameters.categories.join(', ')
            : 'All'}
        </b>
      </p>
      <br />
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
