import React, { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { axios } from 'components/CustomAxios';

type Props = {
  placeId?: number;
  show: boolean;
  onHide: Function;
  onLoad: Function;
  onComplete: Function;
}
const PlaceUserInvitation = (props:Props) => {
 
  const [show, setShow] = useState(false);

  useEffect(() => {
    setShow(props.show);
    if (props.placeId) {
      setPlaceUser({...placeUser, placeId: props.placeId});
    }
  }, [props]);

  const [placeUser, setPlaceUser] = useState({});

  const inviteUser = async (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    props.onLoad();
    await axios.post(`/api/places/${props.placeId}`, placeUser)
    .then(() => {
      props.onComplete({
        show: true,
        title: '사용자 초대 완료',
        message: '사용자 초대를 완료했습니다.',
        bg: 'success'
      });
    })
    .catch((error:any) => {
      if (error.response.status === 409) {
        props.onComplete({
          show: true,
          title: '사용자 초대 실패',
          message: '존재하지 않는 사용자 ID 입니다.',
          bg: 'danger'
        });
      } else if (error.response.status === 400) {
        props.onComplete({
          show: true,
          title: '사용자 초대 실패',
          message: '이미 등록된 사용자 입니다.',
          bg: 'danger'
        });
      } else {
        props.onComplete({
          show: true,
          title: '사용자 초대 실패',
          message: '사용자 초대를 실패했습니다.',
          bg: 'danger'
        });
      }
    });
  }

  const closeModal = () => {
    setShow(false);
    props.onHide();
  }

  const handleChange = (e:any) => {
    setPlaceUser({ ...placeUser, [e.target.name]: e.target.value});
  }

  return (
    <Modal show={show} centered>
      <Modal.Header closeButton>
        <Modal.Title>사용자 정보 수정</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form id="placeForm" onSubmit={inviteUser}>
          <Form.Group className="mb-3">
            <Form.Label>ID</Form.Label>
            <Form.Control name="userId" onChange={handleChange} required placeholder='이메일을 입력하세요' /> 
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>권한</Form.Label>
            <Form.Control as="select" name="permission" onChange={handleChange} required>
              <option value="">선택하세요</option>
              <option value="manager">manager</option>
              <option value="user">user</option>
              <option value="guest">guest</option>
            </Form.Control>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button form='placeForm' variant="primary" type="submit">
          초대
        </Button>
        <Button variant="secondary" onClick={closeModal}>
          닫기
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default PlaceUserInvitation;