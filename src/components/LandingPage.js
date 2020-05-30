import React from 'react';
import { Row, Col, Fade, Spinner } from 'reactstrap';
import RestrictionForm from './RestrictionForm/RestrictionForm';
import RestartForm from './RestartForm';
import Map from './Map/Map';
import InstructionsAlert from './InstructionsAlert';

const LandingPage = () => {
  const [origin, setOrigin] = React.useState(null);
  const [destination, setDestination] = React.useState(null);
  const [waypoints, setWaypoints] = React.useState();
  const [tripData, setTripData] = React.useState();
  const [loading, setLoading] = React.useState(false);

  const resetData = () => {
    setWaypoints(undefined);
    setOrigin(null);
    setDestination(null);
    setTripData(null);
  };

  const renderForm = () =>
    waypoints ? (
      <Fade in={!loading}>
        <RestartForm tripData={tripData} onReset={() => resetData()} />
      </Fade>
    ) : (
      <Fade in={!loading}>
        <RestrictionForm
          origin={origin}
          setLoading={setLoading}
          setWaypoints={setWaypoints}
          destination={destination}
          setTripData={setTripData}
        />
      </Fade>
    );

  return (
    <div style={{ marginTop: '3rem' }}>
      <Row>
        <InstructionsAlert />
      </Row>
      <Row>
        <Col>
          {loading ? (
            <Fade
              in={loading}
              style={{
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                textAlign: 'center',
              }}
            >
              <Spinner
                style={{ height: '5rem', width: '5rem', margin: '1rem auto' }}
                color="primary"
              />
              <p>Please wait, we are preparing a route for you ...</p>
              <p>This process can take a while. Thanks for your patience.</p>
            </Fade>
          ) : (
            renderForm()
          )}
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
