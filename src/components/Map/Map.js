import React from 'react';
import { compose, withProps } from 'recompose';
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  DirectionsRenderer,
  Marker,
} from 'react-google-maps';
import { Card } from 'reactstrap';

const GOOGLE_MAPS_API_KEY = process.env.GOOGLE_MAPS_API_KEY;

const Map = compose(
  withProps({
    googleMapURL: `https://maps.googleapis.com/maps/api/js?key=${GOOGLE_MAPS_API_KEY}&v=3.exp&libraries=geometry,drawing,places`,
    loadingElement: <div style={{ height: `100%` }} />,
    containerElement: <div style={{ height: `800px`, position: 'relative' }} />,
    mapElement: <div style={{ height: `100%` }} />,
  }),
  withScriptjs,
  withGoogleMap,
)((props) => {
  const [directions, setDirections] = React.useState();
  const [route, setRoute] = React.useState();

  React.useEffect(() => {
    setDirections(undefined);
    setRoute(undefined);
    if (props.waypoints || props.origin === null || props.destination === null) return;
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
          const { distance, duration } = result.routes[0].legs[0];
          setRoute({ distance, duration });
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
              }</h5><p>${address}</p><p><b>Rating:</b> ${props.waypoints[i - 1].rating.avgRating}</p>`;
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
    <>
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
        {!props.waypoints && !directions && props.origin && <Marker position={props.origin} />}
        {!props.waypoints && !directions && props.destination && (
          <Marker position={props.destination} />
        )}
      </GoogleMap>
      {!props.waypoints && route && (
        <Card
          className="shadow-lg rounded"
          style={{
            position: 'absolute',
            fontSize: '.8rem',
            bottom: '0rem',
            left: '0rem',
            padding: '1rem',
          }}
        >
          <h5>Trip statistics</h5>
          <p>Distance: {route.distance.text}</p>
          <p>Duration: {route.duration.text}</p>
        </Card>
      )}
    </>
  );
});
export default Map;
