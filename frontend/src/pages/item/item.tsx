import React from 'react';
import Content from 'layout/Content';
import Search from 'components/Search';
import ContentTopBar from 'layout/ContentTopBar';
import { Button } from 'react-bootstrap';
import { SearchType } from 'components/Types';
import './item.scss';

const Item = () => {

  const searchItems = [
    {
      field: 'placeId',
      label: '사업장',
      type: 'select',
      width: 1,
      options: [
        {
          value: 1,
          text: '사업장1'
        },
        {
          value: 2,
          text: '사업장2'
        }
      ]
    },
    {
      field: 'itemType',
      label: '품목 유형',
      type: 'select',
      width: 1,
      options: [
        {
          value: 1,
          text: '제품'
        },
        {
          value: 2,
          text: '상품'
        },
        {
          value: 3,
          text: '자재'
        }
      ]
    },
    {
      field: 'itemName',
      label: '품목명',
      type: 'text',
      width: 3
    }
  ];

  const toCreation = () => console.log('toCreation');

  const search = (searchValue:SearchType) => console.log(searchValue);

  return (
    <Content className='item-list'>
      <ContentTopBar>
        <p className='title'>품목 관리</p>
        <div className='buttons'>
          <Button onClick={toCreation}>생성</Button>
        </div>
      </ContentTopBar>
      <Search searchItems={searchItems} search={search} />
    </Content>
  );
};

export default Item;