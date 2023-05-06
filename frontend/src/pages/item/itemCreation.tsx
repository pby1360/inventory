import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import Loading from 'components/Loading';
// import Toast from 'components/CustomToast';
import Modal from 'components/CustomModal';

import auth from 'components/AuthService';
import { axios } from 'components/CustomAxios';

import { Place } from 'components/Types'

const ItemCreation = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Place>({
    name: '',
    category: '',
    zipCode: '',
    address1: '',
    address2: '',
    contact: '',
    remark: '',
  });

  const [isLoading, setLoading] = useState(false);

  const [modalProps, setModalProps] = useState( {
    show: false,
    title: '',
    message: '',
    callback: () => {},
  })

  const successCallback = () => navigate('/place');
  
  const expiredCallback = () => {
    auth.logout();
    navigate('/sign-in', {replace: true});
    navigate(0);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value});
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    
    if (auth.isExpired()) {
      setModalProps({
        show: true,
        title: '로그인 만료',
        message: '로그인이 만료 되었습니다. 다시 로그인하세요.',
        callback: () => expiredCallback(),
      });
      return;
    }
    
    const data = { ...formData, userId: auth.user().id };

    // setLoading(true);
    await axios.post('/api/places', data)
      .then((response:any) => {
        
        if (response.status === 201) {
          setModalProps({
            show: true,
            title: '생성 완료',
            message: '사업장 생성을 완료 했습니다.',
            callback: () => successCallback(),
          });
        } else {
          setModalProps({
            show: true,
            title: '생성 실패',
            message: '사업장 생성을 실패 했습니다.',
            callback: () => null,
          });
        }
      }).catch((error:any) => {
        setModalProps({
          show: true,
          title: '생성 실패',
          message: '사업장 생성을 실패 했습니다.',
          callback: () => null,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Content className='place-creation'>
      <ContentTopBar>
      <p className='title'>품목 생성</p>
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
          <Form.Control as="input" name="contact" value={formData.contact} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>비고</strong></Form.Label>
          <Form.Control as="textarea" name="remark" value={formData.remark} onChange={handleChange} />
        </Form.Group>
      </Form>
      <Modal props={modalProps}></Modal>
      {isLoading ? <Loading></Loading> : null}
    </Content>
  );
};

export default ItemCreation;