import React from 'react';
import Content from 'layout/Content';
import Search from 'components/Search';
import ContentTopBar from 'layout/ContentTopBar';
import { Button } from 'react-bootstrap';
import { SearchType } from 'components/Types';
import './item.scss';
import Table from 'components/Table';
import dummy from './dummy.json';

const Item = () => {

  const column = [{
    field: 'PRD_CD',
    label: 'PRD_CD',
    width: 3
  },
  {
    field: 'PRD_NM',
    label: 'PRD_NM',
    width: 3
  },
  {
    field: 'PRD_TYP',
    label: 'PRD_TYP',
    width: 3
  },
  {
    field: 'PRD_CLS',
    label: 'PRD_CLS',
    width: 2
  },
  {
    field: 'PRD_GRP',
    label: 'PRD_GRP',
    width: 2
  },
  {
    field: 'PRD_PUR',
    label: 'PRD_PUR',
    width: 3
  },
  {
    field: 'PRD_SP',
    label: 'PRD_SP',
    width: 2
  },
  {
    field: 'PRD_DUR',
    label: 'PRD_DUR',
    width: 2
  },
  {
    field: 'PRD_VAV',
    label: 'PRD_VAV',
    width: 2
  },
  {
    field: 'PRD_UN',
    label: 'PRD_UN',
    width: 2
  }
];

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
      <Table data={dummy} column={column} />
    </Content>
  );
};

export default Item;