import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import Loading from 'components/Loading';
// import Toast from 'components/CustomToast';
import Modal from 'components/CustomModal';

// import auth from 'components/AuthService';
import { axios } from 'components/CustomAxios';

import { Item, PlaceUser } from 'components/Types'

const ItemCreation = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState<Item>({
    placeId: undefined,
    name: '',
    type: '',
    price: undefined,
    unit: '',
    spec: '',
    remark: '',
  });

  const [placeList, setPlaceList] = useState<PlaceUser[]>([]);

  const [isLoading, setLoading] = useState(false);

  const [modalProps, setModalProps] = useState( {
    show: false,
    title: '',
    message: '',
    callback: () => {},
  })

  const getComboData = async () => {
    await axios.get('/api/places').then((response) => {
      setPlaceList(response.data);
    }).catch((error) => console.log(error));
  }

  useEffect(() => {
    getComboData();
  }, []);

  const successCallback = () => navigate('/item');
  
  // const expiredCallback = () => {
  //   auth.logout();
  //   navigate('/sign-in', {reitem: true});
  //   navigate(0);
  // }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value});
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

    setLoading(true);
    await axios.post('/api/items', formData)
      .then((response:any) => {
        
        if (response.status === 201) {
          setModalProps({
            show: true,
            title: '생성 완료',
            message: '품목 생성을 완료 했습니다.',
            callback: () => successCallback(),
          });
        } else {
          setModalProps({
            show: true,
            title: '생성 실패',
            message: '품목 생성을 실패 했습니다.',
            callback: () => null,
          });
        }
      }).catch((error:any) => {
        setModalProps({
          show: true,
          title: '생성 실패',
          message: '품목 생성을 실패 했습니다.',
          callback: () => null,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Content className='item-creation'>
      <ContentTopBar>
      <p className='title'>품목 생성</p>
        <div className='buttons'>
          <Button type='submit' form='itemForm'>저장</Button>
          <Button onClick={() => navigate('/item')} variant='dark'>취소</Button>
        </div>
      </ContentTopBar>
      <Form id='itemForm' className='d-grid p-3 form mt-1' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><strong>품명 *</strong></Form.Label>
          <Form.Control as="input" minLength={2} required name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>품목 유형 *</strong></Form.Label>
          <Form.Control as="select" required name="type" value={formData.type} onChange={handleChange}>
            <option value="">선택하세요</option>
            <option value="product">제품</option>
            <option value="goods">상품</option>
            <option value="material">자재</option>
            <option value="etc">기타</option>
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>사업장 *</strong></Form.Label>
          <Form.Control as="select" required name="placeId" value={formData.placeId} onChange={handleChange}>
            <option value="">선택하세요</option>
            {placeList.map(item => <option key={item.placeId} value={item.placeId}>{item.placeName}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>가격</strong></Form.Label>
          <Form.Control as="input" name="price" value={formData.price} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>단위</strong></Form.Label>
          <Form.Control as="input" name="unit" value={formData.unit} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>규격</strong></Form.Label>
          <Form.Control as="input" name="spec" value={formData.spec} onChange={handleChange} />
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