
import React from 'react';
import { Form, Button } from 'react-bootstrap';

import './component.scss';
const signUp = () => {
  return (
    <div className='join'>
      <section className='info'></section>
      <section className='form'>
        <Form className='d-grid p-5'>
          <Form.Group className="mb-3">
            <Form.Label>Id</Form.Label>
            <Form.Control type="email" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Password</Form.Label>
            <Form.Control required type="password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Confirm Password</Form.Label>
            <Form.Control required type="password" />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Name</Form.Label>
            <Form.Control required as="input" />
          </Form.Group>
          <Button size='lg' type='submit'>Sign-up</Button>
        </Form>
      </section>
    </div>
  );
};

export default signUp;