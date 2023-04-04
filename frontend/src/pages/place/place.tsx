import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from 'react-bootstrap';
import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import './place.scss';
import { PlaceUser } from 'components/Types';
import { axios } from 'components/CustomAxios';

const Place = () => {

  const navigate = useNavigate();

  const toCreation = () => navigate('/place/creation');

  const [list, setList] = useState<PlaceUser[]>([]);

  const getPlaceList = async () => {
    await axios.get('/api/places')
      .then((response:any) => {
        setList(response.data);
      })
  }

  useEffect(() => {
    getPlaceList();
  }, []);
  return (
    <Content className='place-list'>
      <ContentTopBar>
        <p className='title'>사업장 목록</p>
        <div className='buttons'>
          <Button onClick={toCreation}>생성</Button>
          <Button variant='dark'>고정</Button>
        </div>
      </ContentTopBar>
      <section className='center'>
        {list.map(item =>
          <section className='place-item' key={item.placeId}>
            <div className='place-item-header'>
              <div className='place-item-name'>{item.placeName}</div>
              {/* <FormCheck className='icon-check'></FormCheck> */}
            </div>
            <div className='place-item-body'>
              <div className='place-info'>{item.category}</div>
              <div className='place-info'>{item.address}</div>
              <div className='place-info'>{item.permission}</div>
              <div className='place-info'>{item.userStatus}</div>
            </div>
            <div className='place-item-footer'>
              <div>users<span>{item.userCount}</span></div>
              <div>more</div>
            </div>
          </section>
          )}
      </section>
    </Content>
  );
};

export default Place;