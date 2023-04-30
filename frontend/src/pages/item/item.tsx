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
    name: 'PRD_CD_NAME',
  },
  {
    field: 'PRD_NM',
    name: 'PRD_NM_NAME',
  },
  {
    field: 'PRD_TYP',
    name: 'PRD_TYP_NAME',
  },
  {
    field: 'PRD_CLS',
    name: 'PRD_CLS_NAME',
  },
  {
    field: 'PRD_GRP',
    name: 'PRD_GRP_NAME',
  },
  {
    field: 'PRD_PUR',
    name: 'PRD_PUR_NAME',
  },
  {
    field: 'PRD_SP',
    name: 'PRD_SP_NAME',
  },
  {
    field: 'PRD_DUR',
    name: 'PRD_DUR_NAME',
  },
  {
    field: 'PRD_VAV',
    name: 'PRD_VAV_NAME',
  },
  {
    field: 'PRD_UN',
    name: 'PRD_UN_NAME',
  },
  {
    field: 'PRD_ST',
    name: 'PRD_ST_NAME',
  },
  {
    field: 'CRT_DT',
    name: 'CRT_DT_NAME',
  },
  {
    field: 'CRT_USR',
    name: 'CRT_USR_NAME',
  },
  {
    field: 'UPD_DT',
    name: 'UPD_DT_NAME',
  },
  {
    field: 'UPD_USR',
    name: 'UPD_USR_NAME',
  },
  {
    field: 'MO',
    name: 'MO_NAME',
  },
  {
    field: 'ISS',
    name: 'ISS_NAME',
  }];

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