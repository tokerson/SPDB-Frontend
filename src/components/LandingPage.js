import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import RestrictionForm from './RestrictionForm/RestrictionForm';
import Map from './Map/Map';

const LandingPage = () => {
  console.log(process.env);
  console.log(process.env.GOOGLE_MAPS_API_KEY);
  return (
    <div style={{ marginTop: '3rem' }}>
      <Row>
        <Col>
          <RestrictionForm />
        </Col>
        <Col>
          <div className="shadow-lg rounded">
            <Map />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
