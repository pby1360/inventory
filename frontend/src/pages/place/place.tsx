import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import { PlaceUser } from 'components/Types';
import { axios } from 'components/CustomAxios';
import Loading from 'components/Loading';
import CustomModal from 'components/CustomModal';
import CustomToast from 'components/CustomToast';
import './place.scss';
import { BsFillPeopleFill, BsHeartPulseFill, BsInfoCircle, BsStar, BsStarFill } from 'react-icons/bs';
import { BiCategory, BiKey, BiMap } from 'react-icons/bi';

const Place = () => {

  const navigate = useNavigate();

  const toCreation = () => navigate('/place/creation');

  const [list, setList] = useState<PlaceUser[]>([]);

  const [selectedItem, setSelectedItem] = useState<PlaceUser>();

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

  const [bookmark, setBookmark] = useState<number>();

  const selectItem = (item:PlaceUser) => {
    if (item.userStatus !== 'invited') {
      setSelectedItem(item)
    }
  };

  const toDetail = (placeId:number) => navigate(`/place/${placeId}`);

  const toPlaceUsers = (placeId:number) => navigate(`/place/${placeId}/users`);

  const getPlaceList = async () => {
    setLoading(true);
    await axios.get('/api/places')
      .then((response:any) => {
        setList(response.data);
        setLoading(false);
      })
  }  

  useEffect(() => {
    getPlaceList();
  }, []);

  const beforeAccept = (placeUser:PlaceUser) => {
    setModalProps({
      show: true,
      title: '초대 수락',
      message: '사업장 초대를 수락하시겠습니까?',
      cancel: true,
      callback: () => acceptInvitation(placeUser),
    });    
  }

  const acceptInvitation = async (placeUser:PlaceUser) => {
    setLoading(true);
    await axios.put(`/api/places/${placeUser.placeId}/users/${placeUser.placeUserId}/accept`)
    .then(() => {
      setLoading(false);
      setToastProps({
        show: true,
        title: '요청 완료',
        message: '요청을 완료 했습니다.',
        bg: 'info'
      });
      getPlaceList();
    })
    .catch(() => {
      setLoading(false);
      setToastProps({
        show: true,
        title: '요청 실패',
        message: '요청을 실패 했습니다.',
        bg: 'danger'
      });
    })
  }

  const place = (item:PlaceUser) => {
    let template;
    if (item.userStatus === 'invited') {
      template =
        <section className={`place-item invited ${item.placeId === selectedItem?.placeId ? 'selected' : ''}`} key={item.placeId} onClick={() => selectItem(item)}>
          <div className='place-item-header'>
            <div className='place-item-name'>{item.placeName}</div>
          </div>
          <div className='place-item-body'>
            <div className='place-info'>{item.category}</div>
            <div className='place-info'>{item.address}</div>
            <div className='place-info'>{item.permission}</div>
            <div className='place-info'>{item.userStatus}</div>
          </div>
          <div className='place-item-footer'>
            <div><BsFillPeopleFill /><span>{item.userCount}</span></div>
            <div>more</div>
          </div>
          <section className='place-item-overlap'>
            <Button variant='success' onClick={() => beforeAccept(item)}>초대 수락</Button>
          </section>
        </section>
    } else {
      template =
        <section className={`place-item ${item.placeId === selectedItem?.placeId ? 'selected' : ''}`} key={item.placeId} onClick={() => selectItem(item)}>
          <div className='place-item-header'>
            <div className='place-item-name'>{item.placeName}</div>
            <div className='icon-bookmark'>
              {
                bookmark === item.placeId ?
                <BsStarFill
                  stroke="black" fill="gold" strokeWidth="1"
                  onClick={() => setBookmark(undefined)}
                />
                :<BsStar onClick={() => setBookmark(item.placeId)} />
              }
              
            </div>
          </div>
          <div className='place-item-body'>
            <div title='업종' className='place-info'><BiCategory /><span>{item.category}</span></div>
            <div title='사업장 주소' className='place-info'><BiMap /><span>{item.address}</span></div>
            <div title='사용자 권한' className='place-info'><BiKey /><span>{item.permission}</span></div>
            <div title='사용자 상태' className='place-info'><BsHeartPulseFill /><span>{item.userStatus}</span></div>
          </div>
          <div className='place-item-footer'>
            <div title='사용자 목록' className='icon-users'><BsFillPeopleFill onClick={() => toPlaceUsers(item.placeId)} /><span>{item.userCount}</span></div>
            <div title='상세정보' className='icon-info'><BsInfoCircle onClick={() => toDetail(item.placeId)} /></div>
          </div>
        </section>
    }
    return template;
  }

  return (
    <Content className='place-list'>
      <ContentTopBar>
        <p className='title'>사업장 관리</p>
        <div className='buttons'>
          <Button onClick={toCreation}>생성</Button>
        </div>
      </ContentTopBar>
      <section className='center'>
        { list.map(item => place(item))}
      </section>
      <CustomModal props={modalProps}></CustomModal>
      <CustomToast props={toastProps}></CustomToast>
      {isLoading ? <Loading></Loading> : null}
    </Content>
  );
};

export default Place;