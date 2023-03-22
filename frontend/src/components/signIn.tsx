import React, { useState } from 'react';
import { Button, Form, Modal } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import authService from './authService';
import './component.scss';

const SignIn = () => {

  const navigate = useNavigate();

  const NOT_FOUND = 'Email not found.';
  const BAD_CREDENTIAL = 'Wrong password.';
  const ERROR = 'Faild to sign-in.';

  const [openModal, setOpenModal] = useState(false);
  const [message, setMessage] = useState('');

  const handleSubmit = (event:any) => {
    event.preventDefault();
    authService.login(event.target.id.value, event.target.password.value)
    .then(() => {
      navigate('/', {replace: true});
      navigate(0);
    }).catch(error => {
      const status = error.response.status;
      if (status === 404) {
        setMessage(NOT_FOUND);
      } else if(status === 409) {
        setMessage(BAD_CREDENTIAL);
      } else {
        setMessage(ERROR);
      }
      setOpenModal(true);
    });
  }

  return (
    <div className='login'>
      <Modal show={openModal}>
        <Modal.Header>
          <Modal.Title>Error</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>{message}</p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={() => setOpenModal(false)} variant="danger">OK</Button>
        </Modal.Footer>
      </Modal>
      <div className='box'>
        <p>Welcome!</p>
        <p>Please login for use the system.</p>
        <Form onSubmit={handleSubmit}>
          <Form.Control required type="email" name="id" placeholder='Email' />
          <Form.Control required type="password" name="password" placeholder='Password' />
          <Button variant='primary' type='submit'>Sign In</Button>
          <p><Link to={'/sign-up'}>Sign Up</Link> for free</p>
        </Form>
        <p>or</p>
        <button className='Google'>Google</button>
        <button className='Kakao'>Kakao</button>
        <button className='Naver'>Naver</button>
      </div>
    </div>
  );
};

export default SignIn;