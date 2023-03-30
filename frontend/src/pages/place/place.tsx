import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, FormCheck } from 'react-bootstrap';
import Content from '../../layout/Content';
import ContentTopBar from '../../layout/ContentTopBar';
import './place.scss';

const Place = () => {

  const navigate = useNavigate();

  const toCreation = () => navigate('/place/creation');

  const list = [
    {
      id: 1,
      name: '데일리네일',
      category: '미용업',
      permission: '관리자',
      address: '경기도 이천시 창전동 428-1',
      userCount: 5,
    },
    {
      id: 2,
      name: '샐러디',
      category: '일반음식점',
      permission: '사용자',
      address: '경기도 이천시 중리동 233-1 2층',
      userCount: 2,
    },
  ]

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
          <section className='place-item' key={item.id}>
            <div className='place-item-header'>
              <div className='place-item-name'>{item.name}</div>
              {/* <FormCheck className='icon-check'></FormCheck> */}
            </div>
            <div className='place-item-body'>
              <div className='place-info'>{item.category}</div>
              <div className='place-info'>{item.address}</div>
              <div className='place-info'>{item.permission}</div>
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