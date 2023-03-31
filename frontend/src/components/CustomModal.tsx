import React, { memo, useEffect, useState} from 'react';
import { Button, Modal } from 'react-bootstrap';

const CustomModal = memo(function CustomModal({props, callback}:any) {

  const defaultSetting = {
    show: false,
    title: '',
    message: '',
  }

  const [modalProps , setModalProps] = useState(defaultSetting);

  useEffect(() => {
    setModalProps({...modalProps, ...props});
  }, [props]);

  const handleClick = () => {
    setModalProps({ ...modalProps, show: false});
    if (callback) {
      callback();
    }
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
        <Button onClick={handleClick} variant="success">OK</Button>
      </Modal.Footer>
    </Modal>
  );
});

export default CustomModal;