import React, { memo, useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = memo(function CustomModal({props}:any) {

  const defaultSetting = {
    show: false,
    title: '',
    message: '',
    cancel: false,
    callback: () => null,
  }

  const [modalProps , setModalProps] = useState(defaultSetting);

  useEffect(() => {
    setModalProps({...modalProps, ...props});
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [props]);

  const handleClick = () => {
    setModalProps({ ...modalProps, show: false});
    // if (modalProps.callback) {
    modalProps.callback();
    // }
  };

  return (
    <Modal show={modalProps.show}>
      <Modal.Header>
        <Modal.Title>{modalProps.title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{modalProps.message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={handleClick} variant="primary">확인</Button>
        {modalProps.cancel ? <Button onClick={() => setModalProps({ ...modalProps, show: false})} variant="dark">취소</Button> : null}
      </Modal.Footer>
    </Modal>
  );
});

export default CustomModal;