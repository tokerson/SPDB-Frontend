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
    setDirections(undefined);
    if (props.waypoints || props.origin === null || props.destination === null) return;
    console.log('here');
    const DirectionsService = new google.maps.DirectionsService();
    DirectionsService.route(
      {
        origin: props.origin,
        destination: props.destination,
        travelMode: google.maps.TravelMode.DRIVING,
        avoidHighways: true,
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

  React.useEffect(() => {
    const DirectionsService = new google.maps.DirectionsService();
    setDirections(undefined);

    if (props.waypoints) {
      const waypoints = props.waypoints.map((waypoint) => ({
        location: { lat: waypoint.location.lat, lng: waypoint.location.lng },
        stopover: true,
      }));
      const origin = props.origin;
      const destination = props.destination;

      DirectionsService.route(
        {
          origin: origin,
          destination: destination,
          travelMode: google.maps.TravelMode.DRIVING,
          avoidHighways: true,
          waypoints: waypoints,
        },
        (result, status) => {
          if (status === google.maps.DirectionsStatus.OK) {
            const numberOfLegs = result.routes[0].legs.length;
            result.routes[0].legs[0].start_address = `<h5>Origin</h5><p>${
              result.routes[0].legs[0].start_address
            }</p>`;
            for (let i = 1; i < numberOfLegs; i++) {
              const address = result.routes[0].legs[i].start_address;
              result.routes[0].legs[i].start_address = `<h5>${
                props.waypoints[i - 1].name
              }</h5><p>${address}</p>`;
            }
            result.routes[0].legs[numberOfLegs - 1].end_address = `<h5>Destination</h5><p>${
              result.routes[0].legs[numberOfLegs - 1].end_address
            }</p>`;
            setDirections(result);
          } else {
            console.error(`error fetching directions ${result}`);
          }
        },
      );
    }
  }, [props.waypoints]);

  return (
    <GoogleMap
      defaultZoom={16}
      defaultCenter={props.defaultCenter}
      onClick={(e) => {
        if (!props.waypoints) {
          props.setOrigin(e.latLng);
        }
      }}
      onRightClick={(e) => {
        if (!props.waypoints) {
          props.setDestination(e.latLng);
        }
      }}
    >
      {props.origin && props.destination && directions && (
        <DirectionsRenderer directions={directions} />
      )}
      {!props.waypoints && props.origin && <Marker position={props.origin} />}
      {!props.waypoints && props.destination && <Marker position={props.destination} />}
    </GoogleMap>
  );
});
export default Map;
