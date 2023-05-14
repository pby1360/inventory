import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form } from 'react-bootstrap';

import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import Loading from 'components/Loading';
import Modal from 'components/CustomModal';

import { axios } from 'components/CustomAxios';

import { StorageType, PlaceUser } from 'components/Types'

const StorageDetail = () => {

  const params = useParams();
  
  const navigate = useNavigate();
  const [formData, setFormData] = useState<StorageType>({
    placeId: undefined,
    name: '',
    createdAt: '',
    createdBy: '',
    modifiedAt: '',
    modifiedBy: '',
    remark: '',
  });

  const [isEditable, setEditable] = useState(false);

  const [placeList, setPlaceList] = useState<PlaceUser[]>([]);

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

  const getDetail = async () => {
    setLoading(true);
    axios.get(`/api/storages/${params.id}`)
    .then((response:any) => {
      setFormData(response.data);
    })
    .catch((error) => {
      console.log(error);
      setModalProps({
        show: true,
        title: '실패',
        message: '저장소 상세정보 조회를 실패했습니다.',
        callback: () => null,
      });
    })
    .finally(() => setLoading(false))
  }

  useEffect(() => {
    getPlaceList();
    getDetail();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const successCallback = () => {
    getDetail();
    setEditable(false);
  };
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.currentTarget.name]: e.currentTarget.value});
  }

  const handleSubmit = async (e:React.FormEvent<HTMLFormElement>) => {
    
    e.preventDefault();
    
    setLoading(true);

    await axios.put('/api/storages', formData)
      .then((response:any) => {
        if (response.status === 200) {
          setModalProps({
            show: true,
            title: '수정 완료',
            message: '저장소 수정을 완료 했습니다.',
            callback: () => successCallback(),
          });
        } else {
          setModalProps({
            show: true,
            title: '수정 실패',
            message: '저장소 수정을 실패 했습니다.',
            callback: () => null,
          });
        }
      }).catch((error:any) => {
        setModalProps({
          show: true,
          title: '수정 실패',
          message: '저장소 수정을 실패 했습니다.',
          callback: () => null,
        });
      })
      .finally(() => setLoading(false));
  }

  const changeMode = (e:any) => {
    e.preventDefault();
    setEditable(true);
  }

  const deleteStorage = async () => {
    await axios.delete(`/api/storages/${params.id}`)
      .then((response:any) => {
        if (response.status === 200) {
          setModalProps({
            show: true,
            title: '삭제 완료',
            message: '저장소 삭제를 완료 했습니다.',
            callback: () => navigate('/storage'),
          });
        } else {
          setModalProps({
            show: true,
            title: '삭제 실패',
            message: '저장소 삭제를 실패 했습니다.',
            callback: () => null,
          });
        }
      }).catch((error:any) => {
        setModalProps({
          show: true,
          title: '삭제 실패',
          message: '저장소 삭제를 실패 했습니다.',
          callback: () => null,
        });
      })
      .finally(() => setLoading(false));
  }

  return (
    <Content className='storage-creation'>
      <ContentTopBar>
      <p className='title'>저장소 상세정보</p>
        <div className='buttons'>
          {isEditable ?
            <>
              <Button type='submit' form='storageForm'>저장</Button>
              <Button onClick={() => successCallback()} variant='dark'>취소</Button>
            </>
            :
            <>
              <Button type='button' onClick={changeMode}>수정</Button>
              <Button variant='danger' type='button' onClick={deleteStorage}>삭제</Button>
              <Button onClick={() => navigate('/storage')} variant='dark'>뒤로가기</Button>
            </>
          }
        </div>
      </ContentTopBar>
      <Form id='storageForm' className='d-grid p-3 form mt-1' onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label><strong>사업장 *</strong></Form.Label>
          <Form.Control as="select" required name="placeId" value={formData.placeId} disabled>
            <option value="">선택하세요</option>
            {placeList.map(item => <option key={item.placeId} value={item.placeId}>{item.placeName}</option>)}
          </Form.Control>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>저장소명 *</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="input" minLength={2} required name="name" value={formData.name} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>생성자</strong></Form.Label>
          <Form.Control disabled as="input" name="createUserName" value={formData.createUserName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>생성일시</strong></Form.Label>
          <Form.Control disabled as="input" name="createdAt" value={formData.createdAt} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>수정자</strong></Form.Label>
          <Form.Control disabled as="input" name="modifyUserName" value={formData.modifyUserName} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>수정일시</strong></Form.Label>
          <Form.Control disabled as="input" name="modifiedAt" value={formData.modifiedAt} onChange={handleChange} />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label><strong>비고</strong></Form.Label>
          <Form.Control disabled={!isEditable} as="textarea" name="remark" value={formData.remark} onChange={handleChange} />
        </Form.Group>
      </Form>
      <Modal props={modalProps}></Modal>
      {isLoading ? <Loading></Loading> : null}
    </Content>
  );
};

export default StorageDetail;