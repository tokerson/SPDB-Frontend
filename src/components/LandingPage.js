import React from 'react';
import { Button, Row, Col } from 'reactstrap';
import RestrictionForm from './RestrictionForm/RestrictionForm';

const LandingPage = () => {
  return (
    <div style={{marginTop: "3rem"}}>
      <Row>
        <Col>
          <RestrictionForm />
        </Col>
        <Col>
          <h2>Here will be a map</h2>
        </Col>
      </Row>
    </div>
  );
};

export default LandingPage;
