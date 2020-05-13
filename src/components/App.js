/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import LandingPage from './LandingPage';
import { Container } from 'reactstrap';

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Container>
          <Route exact path="/" component={LandingPage} />
        </Container>
      </Switch>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default hot(module)(App);
