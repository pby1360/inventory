import React, { useState,useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import Modal from 'components/CustomModal';
import { axios } from 'components/CustomAxios';
import auth from 'components/AuthService';
import { Place } from 'components/Types'
import Loading from 'components/Loading';

const PlaceDetail = () => {

  const params = useParams();

  const [modalProps, setModalProps] = useState( {
    show: false,
    title: '',
    message: '',
    callback: () => {},
  })

  const [isLoading, setLoading] = useState(false);

  const [isEditable, setEditable] = useState(false);

  const getDetail = async () => {
    setLoading(true);
    axios.get(`/api/places/${params.placeId}`)
    .then((response:any) => {
      setFormData(response.data);
    })
    .catch((error) => {
      console.log(error);
      setModalProps({
        show: true,
        title: '실패',
        message: '사업장 상세정보 조회를 실패했습니다.',
        callback: () => null,
      });
    })
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    if (!isEditable) {
      getDetail();
    }
    
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isEditable]);
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Place>({
    id: undefined,
    name: '',
    category: '',
    zipCode: '',
    address1: '',
    address2: '',
    contact: '',
    remark: '',
  });
  
  // const expiredCallback = () => {
  //   auth.logout();
  //   navigate('/sign-in', {replace: true});
  //   navigate(0);
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value});
  }

  const changeMode = (e:any) => {
    e.preventDefault();
    setEditable(true);
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    // if (auth.isExpired()) {
    //   setModalProps({
    //     show: true,
    //     title: '로그인 만료',
    //     message: '로그인이 만료 되었습니다. 다시 로그인하세요.',
    //     callback: () => expiredCallback(),
    //   });
    //   return;
    // }

    const data = { ...formData, userId: auth.user().id };

    await axios.put('/api/places', data)
      .then(() => {
        setModalProps({
          show: true,
          title: '수정 완료',
          message: '사업장 수정을 완료했습니다.',
          callback: () => null,
        });
        setEditable(false);
      }).catch((error:any) => {
        if (error.response.status === 409) {
          setModalProps({
            show: true,
            title: '수정 실패',
            message: '수정할 수 있는 권한이 없습니다.',
            callback: () => null,
          });
        } else {
          setModalProps({
            show: true,
            title: '수정 실패',
            message: '수정을 실패했습니다.',
            callback: () => null,
          });
        }
      });
  }

  return (
    <Content className='place-creation'>
      <ContentTopBar>
      <p className='title'>사업장 상세정보</p>
        <div className='buttons'>
          {isEditable ?
            <>
              <Button type='submit' form='placeForm'>저장</Button>
              <Button onClick={() => setEditable(false)} variant='dark'>취소</Button>
            </>
            :
            <>
              <Button type='button' onClick={changeMode}>수정</Button>
              <Button variant='danger' type='button'>삭제</Button>
              <Button onClick={() => navigate('/place')} variant='dark'>뒤로가기</Button>
            </>
          }
        </div>
      </ContentTopBar>
      <Form id='placeForm' className='d-grid p-3 form mt-1' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><strong>사업장명 *</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="input" minLength={2} required name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>업종 *</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="input" minLength={2} required name="category" value={formData.category} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>우편번호</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="input" type='number' name="zipCode" value={formData.zipCode} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>주소</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="input" name="address1" value={formData.address1} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>상세주소</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="input" name="address2" value={formData.address2} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>연락처</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="input" name="contact" value={formData.contact} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>비고</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="textarea" name="remark" value={formData.remark} onChange={handleChange} />
        </Form.Group>
      </Form>
      <Modal props={modalProps}></Modal>
      {isLoading && <Loading></Loading>}
    </Content>
  );
};

export default PlaceDetail;