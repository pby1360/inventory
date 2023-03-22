
import React, { useMemo, useState } from 'react';
import { Form, Button, Row, Col, FormLabel, Toast, ToastContainer, Modal } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { axios } from '../components/customAxios';

import './component.scss';
const SignUp = () => {

  const navigate = useNavigate();

  const CHECK_PASSWORD = 'Check your password!';
  const ID_DUPLICATED = 'The ID is already in use.';
  const SUCCESS = 'Registration is complete!';
  const ERROR = 'Failed to sign up.';
  
  const initProps = {
    show: false,
    title: '',
    message: '',
    bg: 'primary'
  }
  const [toastProps , setToastProps] = useState(initProps);
  const [openModal, setOpenModal] = useState(false);
  const [formData, setFormData ]
   = useState(
    {
      id: ''
      , password: ''
      , confirmPassword: ''
      , name: ''
      , year: ''
      , month: ''
      , day: ''
      , gender: ''
    });

  const handleChange = (e:any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value})
  }
  
  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      return setToastProps({ show: true, title: 'Warning',message: CHECK_PASSWORD, bg: 'warning'});
    }

    const data = { ...formData, birth: `${formData.year}-${Number(formData.month) < 10 ? '0' + formData.month : formData.month}-${Number(formData.day) < 10 ? '0' + formData.day : formData.day}`};

    await axios.post('/auth/sign-up', data)
      .then((response) => {
        setOpenModal(true);
      }).catch(error => {
        if (error.response.status === 409) {
          return setToastProps({ show: true, title: 'Danger',message: ID_DUPLICATED, bg: 'danger'});
        } else {
          return setToastProps({ show: true, title: 'Danger',message: ERROR, bg: 'danger'});
        }
      });
  }

  const handleClick = () => navigate('/sign-in');

  const years = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let i = 100; i >= 0; i--) {
      years.push(currentYear - i);
    }
    return years;
  }

  const getDays = () => {
    if (formData.year && formData.month) {
      const currentDay = new Date(Number(formData.year), Number(formData.month), 0).getDate();
      const days = [];
      for (let i = currentDay; i > 0; i--) {
        days.push(currentDay - i + 1);
      }
      return days;
    } else {
      return [];
    }
  }

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const days = useMemo(() => getDays(), [formData.year, formData.month]);

  return (
    <div className='join'>
      <section className='info'>
        <ToastContainer position='top-center'>
          <Toast autohide={true} delay={3000} bg={toastProps.bg} show={toastProps.show} onClose={() => setToastProps({...toastProps, show: false})}>
              <Toast.Header>
                <strong className="me-auto">{toastProps.title}</strong>
              </Toast.Header>
              <Toast.Body>{toastProps.message}</Toast.Body>
          </Toast>
        </ToastContainer>
        <Modal show={openModal}>
          <Modal.Header>
            <Modal.Title>Success</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>{SUCCESS}</p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={handleClick} variant="success">OK</Button>
          </Modal.Footer>
        </Modal>
      </section>
      <section className='form'>
        <Form className='d-grid p-5' onSubmit={handleSubmit}>
          <Form.Group className="mb-3">
            <Form.Label><strong>Email</strong></Form.Label>
            <Form.Control required type="email" name="id" value={formData.id} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><strong>Password</strong></Form.Label>
            <Form.Control required type="password" name="password" value={formData.password} onChange={handleChange} />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><strong>Confirm Password</strong></Form.Label>
            <Form.Control required type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} isInvalid={formData.password !== formData.confirmPassword} />
            <Form.Control.Feedback type="invalid">
              Password does not match.
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label><strong>Name</strong></Form.Label>
            <Form.Control required as="input" name="name" value={formData.name} onChange={handleChange} />
          </Form.Group>
          <Row className="mb-3">
            <FormLabel><strong>Birth</strong></FormLabel>
            <Form.Group as={Col}>
              <Form.Label>Year</Form.Label>
              <Form.Control as="select" required name="year" value={formData.year} onChange={handleChange}>
                <option value="">Select</option>
                {years().map(year => (<option key={year}>{year}</option>))}
              </Form.Control>
              </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Month</Form.Label>
              <Form.Control as="select" required name="month" value={formData.month} onChange={handleChange}>
                <option value="">Select</option>
                <option value={1}>1</option>
                <option value={2}>2</option>
                <option value={3}>3</option>
                <option value={4}>4</option>
                <option value={5}>5</option>
                <option value={6}>6</option>
                <option value={7}>7</option>
                <option value={8}>8</option>
                <option value={9}>9</option>
                <option value={10}>10</option>
                <option value={11}>11</option>
                <option value={12}>12</option>
              </Form.Control>
            </Form.Group>
            <Form.Group as={Col}>
              <Form.Label>Day</Form.Label>
              <Form.Control as="select" name="day" value={formData.day} onChange={handleChange}>
                <option value="">Select</option>
                {days.map(day => (<option key={day}>{day}</option>))}
              </Form.Control>
            </Form.Group>
          </Row>
          <Form.Group as={Col} className="mb-3">
            <Form.Label><strong>Gender</strong></Form.Label>
            <Form.Control as="select" name="gender" onChange={handleChange} value={formData.gender} required>
              <option value="">Select</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Control>
          </Form.Group>
          <Button size='lg' type='submit'>Sign-up</Button>
        </Form>
      </section>
    </div>
  );
};

export default SignUp;