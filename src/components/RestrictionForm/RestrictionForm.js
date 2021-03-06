import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Card, Form, FormGroup, Label, Input, Button, FormFeedback } from 'reactstrap';
import Select from 'react-select';

const HOST = 'http://localhost:8080';

// getting user data about restrictions applied when generating a trip
// origin and destination fields are set by clicking on the Map component

const RestrictionForm = ({
  origin,
  destination,
  setWaypoints,
  setLoading,
  setTripData,
  setError,
}) => {
  const { register, errors, setValue, handleSubmit } = useForm();
  const [categories, setCategories] = React.useState({});

  React.useEffect(() => {
    register({ name: 'categories' });
    axios.get(`${HOST}/api/categories`).then((res) => {
      setCategories(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    const payload = prepareFormData(data);
    setLoading(true);

    // query is created based on given parameters, if some are missing, they are not included in the query params
    const query = `${HOST}/api/waypoints?origin=${payload.origin}&destination=${
      payload.destination
    }${payload.searchingStart !== '' ? `&searchingStart=${payload.searchingStart}` : ''}${
      payload.timeInPoi !== '' ? `&timeInPoi=${payload.timeInPoi}` : ''
    }${payload.categories !== '' ? `&categories=${payload.categories}` : ''}${
      payload.additionalDistance !== '' ? `&additionalDistance=${payload.additionalDistance}` : ''
    }${payload.minimalRating !== '' ? `&minimalRating=${payload.minimalRating}` : ''}${
      payload.additionalTime !== '' ? `&additionalTime=${payload.additionalTime}` : ''
    }`;
    axios
      .get(query)
      .then((res) => {
        const { waypoints, ...restData } = res.data;
        setWaypoints(waypoints);
        setTripData(restData);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.response.data)
        setLoading(false);
      });
  };

  const prepareFormData = (data) => {
    const convertHoursToSeconds = (timeString) => {
      //timeString should be in format HH:MM
      if (timeString === '') return timeString;
      const [hour, minute] = timeString.trim().split(':');
      return hour * 3600 + minute * 60;
    };

    const parseCategories = (categories) => {
      if (!categories) return '';
      const categoriesIds = categories.map(({ value }) => value);
      return categoriesIds.join(',');
    };

    return {
      ...data,
      timeInPoi: convertHoursToSeconds(data.timeInPoi),
      additionalTime: convertHoursToSeconds(data.additionalTime),
      searchingStart: convertHoursToSeconds(data.searchingStart),
      categories: parseCategories(data.categories),
      additionalDistance: data.additionalDistance && parseInt(data.additionalDistance) * 1000,
    };
  };

  return (
    <Card style={{ padding: '1rem' }} className="shadow-lg rounded">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="minimalRating">Select minimum rating of visited places</Label>
          <Input innerRef={register} type="select" name="minimalRating" id="minimalRating">
            <option value={0}>0</option>
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="timeInPoi">How long do you plan to stay in one place?</Label>
          <Input
            innerRef={register}
            type="time"
            name="timeInPoi"
            id="timeInPoi"
            placeholder="time placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="additionalTime">By how long can your trip be extended?</Label>
          <Input
            innerRef={register}
            type="time"
            name="additionalTime"
            id="additionalTime"
            placeholder="time placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="searchingStart">
            At what time from start do you want to visit first place?
          </Label>
          <Input
            innerRef={register}
            type="time"
            name="searchingStart"
            id="searchingStart"
            placeholder="time placeholder"
          />
        </FormGroup>
        <FormGroup>
          <Label for="additionalDistance">
            What is the maximum additional distance you are willing to make (km)
          </Label>
          <Input
            innerRef={register}
            type="number"
            name="additionalDistance"
            id="additionalDistance"
            min="0"
          />
        </FormGroup>
        <FormGroup>
          <Label for="categories">Select categories that you may be interested in visiting</Label>
          <Select
            name="categories"
            isMulti
            onChange={(value, action) => {
              const inputRef = action.name;
              setValue(inputRef, value);
            }}
            options={Object.keys(categories).map((key) => {
              return { value: key, label: categories[key] };
            })}
          />
        </FormGroup>
        <FormGroup>
          <Label for="origin">Origin</Label>
          <Input
            innerRef={register({ required: true })}
            type="text"
            name="origin"
            id="origin"
            invalid={errors.origin && !origin}
            value={origin && `${origin.lat()},${origin.lng()}`}
            readOnly
          />
          {errors.origin && (
            <FormFeedback>Select trip origin by left clicking on the map</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Label for="destination">Destination</Label>
          <Input
            innerRef={register({ required: true })}
            type="text"
            name="destination"
            id="destination"
            invalid={errors.destination && !destination}
            value={destination && `${destination.lat()},${destination.lng()}`}
            readOnly
          />
          {errors.destination && (
            <FormFeedback>Select trip destination by right clicking on the map</FormFeedback>
          )}
        </FormGroup>
        <FormGroup>
          <Button type="submit" color="primary">
            Submit
          </Button>
        </FormGroup>
      </Form>
    </Card>
  );
};

RestrictionForm.propTypes = {
  origin: PropTypes.object,
  destination: PropTypes.object,
  setWaypoints: PropTypes.func.isRequired,
  setLoading: PropTypes.func.isRequired,
  setTripData: PropTypes.func.isRequired,
  setError: PropTypes.func.isRequired,
};

export default RestrictionForm;
