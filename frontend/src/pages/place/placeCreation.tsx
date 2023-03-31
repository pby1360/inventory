import React, { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import Toast from 'components/CustomToast';
import Modal from 'components/CustomModal';

import { Place } from 'components/Types'
// import { axios } from 'components/CustomAxios';

const PlaceCreation = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Place>({
    name: '',
    category: '',
    zipCode: '',
    address1: '',
    address2: '',
    contract: '',
    remark: '',
  });

  const [modalProps, setModalProps] = useState( {
    show: false,
    title: '완료',
    message: '사업장 생성을 완료했습니다.',
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value});
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setModalProps({...modalProps, show: true});
  }

  const callback = () => navigate('/place');

  return (
    <Content className='place-creation'>
      <ContentTopBar>
      <p className='title'>사업장 생성</p>
        <div className='buttons'>
          <Button type='submit' form='placeForm'>저장</Button>
          <Button onClick={() => navigate('/place')} variant='dark'>취소</Button>
        </div>
      </ContentTopBar>
      <Form id='placeForm' className='d-grid p-3 form mt-1' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><strong>사업장명 *</strong></Form.Label>
          <Form.Control as="input" minLength={2} required name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>업종 *</strong></Form.Label>
          <Form.Control as="input" minLength={2} required name="category" value={formData.category} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>우편번호</strong></Form.Label>
          <Form.Control as="input" type='number' name="zipCode" value={formData.zipCode} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>주소</strong></Form.Label>
          <Form.Control as="input" name="address1" value={formData.address1} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>상세주소</strong></Form.Label>
          <Form.Control as="input" name="address2" value={formData.address2} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>연락처</strong></Form.Label>
          <Form.Control as="input" name="contract" value={formData.contract} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>비고</strong></Form.Label>
          <Form.Control as="textarea" name="remark" value={formData.remark} onChange={handleChange} />
        </Form.Group>
      </Form>
      <Modal props={modalProps} callback={callback}></Modal>
    </Content>
  );
};

export default PlaceCreation;