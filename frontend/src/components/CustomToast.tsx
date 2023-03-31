import React, { useState, useEffect, memo } from 'react';
import { Toast, ToastContainer } from 'react-bootstrap';

const CustomToast = memo(function CustomToast({props}:any) {

  interface Toast {
    show?: boolean;
    title?: string;
    message?: string;
    bg: string;
    delay?: number;
    autohide?: boolean;    
  }

  interface defaultKey {
    [key: string]: string;
  }
  const defaultTitle:defaultKey = {
    success: '성공',
    danger: '실패',
    info: '알림',
  }

  const defaultMessage:defaultKey = {
    success: '작업을 성공했습니다.',
    danger: '작업을 실패했습니다.',
    info: '메시지가 없습니다.',
  }

  const defaultSetting:Toast = {
    show: false,
    title: '',
    message: '',
    bg: 'info',
    delay: 5000,
    autohide: true,
  }

  const [toastProps , setToastProps] = useState(defaultSetting);

  useEffect(() => {
    const customProps:Toast = { ... props };

    if (!customProps.title) {
      customProps.title = defaultTitle[customProps.bg];
    }
    if (!customProps.message) {
      customProps.message = defaultMessage[customProps.bg];
    }

    setToastProps({...toastProps, ...customProps});
  }, [props]);


  return (
    <ToastContainer position='top-center'>
      <Toast autohide={toastProps.autohide} delay={toastProps.delay} bg={toastProps.bg} show={toastProps.show} onClose={() => setToastProps({...toastProps, show: false})}>
          <Toast.Header>
            <strong className="me-auto">{toastProps.title}</strong>
          </Toast.Header>
          <Toast.Body>{toastProps.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
});

export default CustomToast;