import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import Loading from 'components/Loading';
import Modal from 'components/CustomModal';

import { axios } from 'components/CustomAxios';

import { StorageType, PlaceUser, InventoryType, ItemType } from 'components/Types'

const StorageCreation = () => {
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState<InventoryType>({
    placeId: undefined,
    storageId: undefined,
    itemId: undefined,
    quantity: undefined,
    remark: '',
  });

  const [placeList, setPlaceList] = useState<PlaceUser[]>([]);
  const [storageList, setStorageList] = useState<StorageType[]>([]);
  const [itemList, setItemList] = useState<ItemType[]>([]);

  const [isLoading, setLoading] = useState(false);

  const [modalProps, setModalProps] = useState( {
    show: false,
    title: '',
    message: '',
    callback: () => {},
  })

  const getPlaceList = async () => {
    await axios.get('/api/places').then((response) => {
      setPlaceList(response.data);
    }).catch((error) => console.log(error));
  }

  const getStorageList = async (placeId:number) => {
    await axios.get(`/api/storages?placeId=${placeId}`).then((response) => {
      setStorageList(response.data);
    }).catch((error) => console.log(error));
  }

  const getItemList = async (placeId:number) => {
    await axios.get(`/api/items?placeId=${placeId}`).then((response) => {
      setItemList(response.data);
    }).catch((error) => console.log(error));
  }

  useEffect(() => {
    console.log('useEffect');
    if (formData.placeId) {
      getStorageList(formData.placeId);
      getItemList(formData.placeId);
    } else {
      formData.storageId = undefined;
      formData.itemId = undefined;
      setStorageList([]);
      setItemList([]);
      getPlaceList();
    }
    
  }, [formData.placeId]);

  const successCallback = () => navigate('/inventory');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value});
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    
    setLoading(true);

    await axios.post('/api/inventories', formData)
      .then((response:any) => {
        
        if (response.status === 201) {
          setModalProps({
            show: true,
            title: '등록 완료',
            message: '재고 등록을 완료 했습니다.',
            callback: () => successCallback(),
          });
        } else {
          setModalProps({
            show: true,
            title: '등록 실패',
            message: '재고 등록을 실패 했습니다.',
            callback: () => null,
          });
        }
      }).catch((error:any) => {
        if (error.response) {

          const status = error.response.status;

          if (status === 400) {
            setModalProps({
              show: true,
              title: '등록 실패',
              message: '이미 등록된 재고입니다.',
              callback: () => null,
            });
          } else {
            setModalProps({
              show: true,
              title: '등록 실패',
              message: '재고 등록을 실패 했습니다.',
              callback: () => null,
            });
          }
        } else {
          setModalProps({
            show: true,
            title: '등록 실패',
            message: '재고 등록을 실패 했습니다.',
            callback: () => null,
          });
        }
      })
      .finally(() => setLoading(false));
  }

  return (
    <Content className='storage-creation'>
      <ContentTopBar>
      <p className='title'>재고 등록</p>
        <div className='buttons'>
          <Button type='submit' form='storageForm'>저장</Button>
          <Button onClick={() => navigate('/storage')} variant='dark'>취소</Button>
        </div>
      </ContentTopBar>
      <Form id='storageForm' className='d-grid p-3 form mt-1' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><strong>사업장 *</strong></Form.Label>
          <Form.Control as="select" required name="placeId" value={formData.placeId} onChange={handleChange}>
            <option value="">선택하세요</option>
            {placeList.map(item => <option key={item.placeId} value={item.placeId}>{item.placeName}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>저장소 *</strong></Form.Label>
          <Form.Control as="select" required name="storageId" value={formData.storageId} onChange={handleChange}>
            <option value="">선택하세요</option>
            {storageList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>품목 *</strong></Form.Label>
          <Form.Control as="select" required name="itemId" value={formData.itemId} onChange={handleChange}>
            <option value="">선택하세요</option>
            {itemList.map(item => <option key={item.id} value={item.id}>{item.name}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>수량 *</strong></Form.Label>
          <Form.Control as="input" type="number" name="quantity" value={formData.quantity} onChange={handleChange} />
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

export default StorageCreation;