import { axios } from 'components/CustomAxios';
import Content from 'layout/Content';
import ContentTopBar from 'layout/ContentTopBar';
import React, { useState, useEffect } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';
import Loading from 'components/Loading';
import { User } from 'components/Types';
import { BsPersonCircle } from 'react-icons/bs'; 
import CustomModal from 'components/CustomModal';
import CustomToast from 'components/CustomToast';
import PlaceUserInvitation from './placeUserInvitation';

type Param = {
  placeId?: number;
}
const PlaceUser = () => {

  const params:Param = useParams();

  const [users, setUsers] = useState<User[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [modalProps, setModalProps] = useState( {
    show: false,
    title: '',
    message: '',
    callback: () => {},
    cancel: false,
  });
  const [toastProps , setToastProps] = useState({
    show: false,
    title: '',
    message: '',
    bg: 'primary'
  });
  const [isOpenEditPopup, setOpenEditPopup] = useState(false);
  const [isOpenInvitePopup, setOpenInvitePopup] = useState(false);
  const [selectedUser , setSelectedUser] = useState<any>({});

  const openEditPopup = (id:number) => {
    const index = users.findIndex(user => user.id === id);
    setSelectedUser(users[index]);
    setOpenEditPopup(true);
  }

  const openDeleteModal = (id:number) => {
    setModalProps({
      show: true,
      title: '사용자 삭제',
      message: '사용자를 삭제 하시겠습니까?',
      cancel: true,
      callback: () => deleteUser(id),
    });    
  }

  const deleteUser = async (id:number) => {
    setLoading(true);
    await axios.delete(`/api/places/${params.placeId}/users/${id}`)
    .then(() => {
      setToastProps({
        show: true,
        title: '삭제 완료',
        message: '사용자 삭제를 완료 했습니다.',
        bg: 'success'
      });
      getUsers();
    }).catch((error:any) => {
      setToastProps({
        show: true,
        title: '삭제 실패',
        message: '사용자 삭제를 실패 했습니다.',
        bg: 'danger'
      });
    }).finally(() => setLoading(false));
  }

  const closeEditPopup = () => {
    setSelectedUser({});
    setOpenEditPopup(false);
  }

  const handleChange = (e:any) => {
    setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value});
  }

  const saveUser = async() => {
    setLoading(true);
    await axios.put(`/api/places/${params.placeId}/users/${selectedUser.id}`, selectedUser)
    .then(() => {
      setModalProps({
        show: true,
        title: '수정 완료',
        message: '사용자 정보 수정을 완료 했습니다.',
        cancel: false,
        callback: () => setOpenEditPopup(false),
      });
      getUsers();
    }).catch((error:any) => {
      setToastProps({
        show: true,
        title: '수정 실패',
        message: '사용자 정보 수정을 실패 했습니다.',
        bg: 'danger'
      });
    }).finally(() => setLoading(false));
  }

  const getUsers = async () => {
    setLoading(true);
    await axios.get(`/api/places/${params.placeId}/users`)
    .then(response => {
      setUsers(response.data);
    })
    .catch(error => {
      setModalProps({
        show: true,
        title: '조회 실패',
        message: '사용자 목록 조회를 실패 했습니다.',
        cancel: false,
        callback: () => null,
      });
    })
    .finally(() => setLoading(false));
  }

  useEffect(() => {
    getUsers();
  }, []);

  const navigate = useNavigate();

  const UserList = users.map((user) =>
    <article key={user.userId} className='place-users-list-item'>
      <span><BsPersonCircle size='1.75rem' /></span>
      <span>{user.userId}</span>
      <span>{user.userName}</span>
      <span>{user.phoneNumber}</span>
      <span>{user.permission}</span>
      <span>{user.status}</span>
      <span>{user.createAt}</span>
      <div className='item-buttons'>
        <Button variant='dark' size='sm' onClick={() => openEditPopup(user.id)} >수정</Button>
        <Button variant='danger' size='sm' onClick={() => openDeleteModal(user.id)} >삭제</Button>
      </div>
    </article>
  );

  const onComplete = (params:any) => {
    console.log(params);
    setLoading(false);
    if (params.bg === 'success') {
      setOpenInvitePopup(false);
      getUsers();
    }
    setToastProps({...params});
  }

  return (
    <Content className='place-users'>
      <ContentTopBar>
        <p className='title'>사업장 사용자 목록</p>
        <div className='buttons'>
          <Button onClick={() => setOpenInvitePopup(true)}>초대</Button>
          <Button onClick={() => navigate('/place')} variant='dark'>뒤로가기</Button>
        </div>
      </ContentTopBar>
      <section className='place-users-list'>
        <article className='place-users-list-column'>
          <span>프로필</span>
          <span>ID</span>
          <span>이름</span>
          <span>연락처</span>
          <span>권한</span>
          <span>상태</span>
          <span>등록일시</span>
          <div className='item-buttons'></div>
        </article>
        {UserList}
      </section>
      <Modal show={isOpenEditPopup} onHide={closeEditPopup} centered>
        <Modal.Header closeButton>
          <Modal.Title>사용자 정보 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3">
              <Form.Label>ID</Form.Label>
              <Form.Control value={selectedUser.userId} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>이름</Form.Label>
              <Form.Control value={selectedUser.userName} disabled />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>권한</Form.Label>
              <Form.Control as="select" name="permission" value={selectedUser.permission} onChange={handleChange}>
                {/* <option value="admin">admin</option> */}
                <option value="manager">manager</option>
                <option value="user">user</option>
                <option value="guest">guest</option>
              </Form.Control>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>상태</Form.Label>
              <Form.Control as="select" name="status" value={selectedUser.status} onChange={handleChange}>
                <option value="invited">invited</option>
                <option value="inUse">in Use</option>
                <option value="disabled">disabled</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="primary" onClick={saveUser}>
            저장
          </Button>
          <Button variant="secondary" onClick={closeEditPopup}>
            닫기
          </Button>
        </Modal.Footer>
      </Modal>
      <PlaceUserInvitation placeId={params.placeId} show={isOpenInvitePopup} onHide={() => setOpenInvitePopup(false)} onLoad={() => setLoading(true)} onComplete={onComplete} />
      <CustomModal props={modalProps}></CustomModal>
      <CustomToast props={toastProps}></CustomToast>
      {isLoading ? <Loading></Loading> : null}
    </Content>
  );
};

export default PlaceUser;