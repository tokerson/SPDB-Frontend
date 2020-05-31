import React from 'react';
import { Row, Col, Fade, Spinner, Alert } from 'reactstrap';
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
  const [error, setError] = React.useState();
  const [defaultCenter, setDefaultCenter] = React.useState({ lat: 52.226683, lng: 20.948148 });

  React.useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position.coords);
        setDefaultCenter({ lat: position.coords.latitude, lng: position.coords.longitude });
      },
      (error) => console.log(error),
      {
        enableHighAccuracy: true,
        maximumAge: 0,
      },
    );
  }, []);

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
          setError={setError}
        />
      </Fade>
    );

  return (
    <div style={{ marginTop: '3rem' }}>
      <Row>
        <InstructionsAlert />
      </Row>
      <Row style={{ position: 'relative' }}>
        {error && (
          <Alert
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', zIndex: '2' }}
            color="danger"
            isOpen={error !== undefined}
            toggle={() => setError(undefined)}
          >
            {error}
          </Alert>
        )}
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
              defaultCenter={defaultCenter}
            />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
