import React from 'react';
import { Row, Col } from 'reactstrap';
import RestrictionForm from './RestrictionForm/RestrictionForm';
import Map from './Map/Map';

const LandingPage = () => {
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [waypoints, setWaypoints] = React.useState();

  return (
    <div style={{ marginTop: '3rem' }}>
      <Row>
        <Col>
          <RestrictionForm origin={origin} setWaypoints={setWaypoints} destination={destination} />
        </Col>
        <Col>
          <div className="shadow-lg rounded">
            <Map
              origin={origin}
              destination={destination}
              waypoints={waypoints}
              setOrigin={setOrigin}
              setDestination={setDestination}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
