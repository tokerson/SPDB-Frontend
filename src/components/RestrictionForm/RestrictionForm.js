import React from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { Card, Form, FormGroup, Label, Input, Button } from 'reactstrap';
import Select from 'react-select';

const HOST = 'http://localhost:8080';

const RestrictionForm = () => {
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
      averageTimeSpent: convertHoursToSeconds(data.averageTimeSpent),
      additionalTime: convertHoursToSeconds(data.additionalTime),
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
          <Label for="averageTimeSpent">How long do you plan to stay in one place?</Label>
          <Input
            innerRef={register}
            type="time"
            name="averageTimeSpent"
            id="averageTimeSpent"
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
          <Label for="startTime">At what time do you plan to start your trip?</Label>
          <Input
            innerRef={register}
            type="time"
            name="startTime"
            id="startTime"
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
          <Button type="submit" color="primary">
            Submit
          </Button>
        </FormGroup>
      </Form>
    </Card>
  );
};

RestrictionForm.propTypes = {};

export default RestrictionForm;
