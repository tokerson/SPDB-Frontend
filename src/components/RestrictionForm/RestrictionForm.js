import React from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Card, Form, FormGroup, Label, Input, Button, Select } from 'reactstrap';

const RestrictionForm = (props) => {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => console.log(data);
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
          <Input innerRef={register} type="time" name="averageTimeSpent" id="averageTimeSpent" placeholder="time placeholder" />
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
