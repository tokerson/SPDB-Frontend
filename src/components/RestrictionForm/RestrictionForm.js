import React from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Card, Form, FormGroup, Label, Input, Button, CustomInput } from 'reactstrap';
import Select from 'react-select';

const HOST = 'http://localhost:8080';

const RestrictionForm = ({ origin, destination }) => {
  const { register, setValue, handleSubmit } = useForm();
  const [categories, setCategories] = React.useState({});

  React.useEffect(() => {
    register({ name: 'categories' });
    axios.get(`${HOST}/api/categories`).then((res) => {
      console.log(res.data);
      setCategories(res.data);
    });
  }, []);

  const onSubmit = (data) => {
    console.log(convertFormData(data));
  };

  const convertFormData = (data) => {
    const convertHoursToSeconds = (timeString) => {
      //timeString should be in format HH:MM
      const [hour, minute] = timeString.trim().split(':');
      return hour * 3600 + minute * 60;
    };

    return {
      ...data,
      timeInPoi: convertHoursToSeconds(data.timeInPoi),
      additionalTime: convertHoursToSeconds(data.additionalTime),
      searchingStart: convertHoursToSeconds(data.searchingStart),
    };
  };

  return (
    <Card style={{ padding: '1rem' }} className="shadow-lg rounded">
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FormGroup>
          <Label for="minRating">Select minimum rating of visited places</Label>
          <Input innerRef={register} type="select" name="minRating" id="minRating">
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
          <Label for="searchingStart">At what time do you plan to start your trip?</Label>
          <Input
            innerRef={register}
            type="time"
            name="searchingStart"
            id="searchingStart"
            placeholder="time placeholder"
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
            innerRef={register}
            type="text"
            name="origin"
            id="origin"
            value={origin && `${origin.lat()},${origin.lng()}`}
            readOnly
          />
        </FormGroup>
        <FormGroup>
          <Label for="destination">Destination</Label>
          <Input
            innerRef={register}
            type="text"
            name="destination"
            id="destination"
            value={destination && `${destination.lat()},${destination.lng()}`}
            readOnly
          />
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
};

export default RestrictionForm;
