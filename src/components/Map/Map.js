import React from 'react';
import { compose, withProps } from 'recompose';
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
)((props) => {
  const [directions, setDirections] = React.useState();

  React.useEffect(() => {
    console.log(props);
    if (props.origin === null || props.destination === null) return;
    console.log('here');
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: props.origin,
        destination: props.destination,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === google.maps.DirectionsStatus.OK) {
          setDirections(result);
        } else {
          console.error(`error fetching directions ${result}`);
        }
      },
    );
  }, [props.origin, props.destination]);
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
      {directions && <DirectionsRenderer directions={directions} />}
      {props.origin && <Marker position={props.origin} />}
      {props.destination && <Marker position={props.destination} />}
    </GoogleMap>
  );
});
export default Map;
