import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { compose, withProps, lifecycle } from 'recompose';
import { withScriptjs, withGoogleMap, GoogleMap, DirectionsRenderer } from 'react-google-maps';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;
const API_HOST = process.env.API_HOST || 'http://localhost:8080';

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px` }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
  lifecycle({
    componentDidMount() {
      const DirectionsService = new google.maps.DirectionsService();

      let waypoints = [];
      axios
        .get(`${API_HOST}/dev/mocked_result`)
        .then((res) => {
          console.log(res);
          if (res.data === undefined) return null;
          waypoints = res.data.waypoints.map((waypoint) => ({
            location: { lat: waypoint.location.lat, lng: waypoint.location.lng },
            stopover: true,
          }));
          const origin = waypoints.shift().location;
          const destination = waypoints.pop().location;

          DirectionsService.route(
            {
              origin: origin,
              destination: destination,
              travelMode: google.maps.TravelMode.DRIVING,
              waypoints: waypoints,
            },
            (result, status) => {
              if (status === google.maps.DirectionsStatus.OK) {
                this.setState({
                  directions: result,
                });
              } else {
                console.error(`error fetching directions ${result}`);
              }
            },
          );
        })
        .catch((err) => console.log(err));
    },
  }),
)((props) => {
  return (
    <GoogleMap defaultZoom={16} defaultCenter={{ lat: 52.226683, lng: 20.948148 }}>
      {props.directions && <DirectionsRenderer directions={props.directions} />}
    </GoogleMap>
  );
});

Map.propTypes = {};

export default Map;
