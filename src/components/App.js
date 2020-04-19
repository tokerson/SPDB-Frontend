/* eslint-disable import/no-named-as-default */
import React from 'react';
import PropTypes from 'prop-types';
import { Route, Switch } from 'react-router-dom';
import { hot } from 'react-hot-loader';
import LandingPage from './LandingPage';

// This is a class-based component because the current
// version of hot reloading won't hot reload a stateless
// component at the top-level.

class App extends React.Component {
  render() {
    return (
      <Switch>
        <Route exact path="/" component={LandingPage} />
      </Switch>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
};

export default hot(module)(App);
