import React from 'react';
import PropTypes from 'prop-types';
import { compose, withProps, lifecycle } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from 'react-google-maps';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

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
      // const DirectionsService = new google.maps.DirectionsService();
      // DirectionsService.route(
      //   {
      //     origin: new google.maps.LatLng(52.226683, 20.948148),
      //     destination: new google.maps.LatLng(52.229176, 20.950806),
      //     travelMode: google.maps.TravelMode.DRIVING,
      //   },
      //   (result, status) => {
      //     if (status === google.maps.DirectionsStatus.OK) {
      //       this.setState({
      //         directions: result,
      //       });
      //     } else {
      //       console.error(`error fetching directions ${result}`);
      //     }
      //   },
      // );
    },
  }),
)((props) => {
  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={{ lat: 52.226683, lng: 20.948148 }}
      onClick={(e) => {
        props.setOrigin(e.latLng);
      }}
      onRightClick={(e) => {
        props.setDestination(e.latLng);
      }}
    >
      {props.origin && <Marker position={props.origin} />}
      {props.destination && <Marker position={props.destination} />}
      {/*props.directions && <DirectionsRenderer directions={props.directions} />*/}
    </GoogleMap>
  );
});

Map.propTypes = {};

export default Map;
