import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import Content from 'layout/Content';
import Search from 'components/Search';
import ContentTopBar from 'layout/ContentTopBar';
import Table from 'components/Table';
import Loading from 'components/Loading';
import { axios } from 'components/CustomAxios';

import './item.scss';

import { SearchType } from 'components/Types';

const Item = () => {

  let selectedRow = {};

  interface Place {
    placeId: number;
    placeName: string;
  }
  const [placeList, setPlaceList] = useState<Place[]>([]);
  const [isLoading, setLoading] = useState(false);
  const [list, setList] = useState([]);

  const column = [
    {
      field: 'placeName',
      label: '사업장',
      width: 2
    },
    {
      field: 'name',
      label: '품목명',
      width: 3
    },
    {
      field: 'type',
      label: '품목 유형',
      width: 1
    },
    {
      field: 'unit',
      label: '단위',
      width: 1
    },
    {
      field: 'price',
      label: '단가',
      width: 1
    },
    {
      field: 'spec',
      label: '규격',
      width: 3
    },
  ];

  const searchItems = [
    {
      field: 'placeId',
      label: '사업장',
      type: 'select',
      width: 1,
      options: placeList.map(place => ({value: place.placeId, text: place.placeName}))
    },
    {
      field: 'itemType',
      label: '품목 유형',
      type: 'select',
      width: 1,
      options: [
        {
          value: 'product',
          text: '제품'
        },
        {
          value: 'goods',
          text: '상품'
        },
        {
          value: 'material',
          text: '자재'
        },
        {
          value: 'etc',
          text: '기타'
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
  
  const toDetail = () => console.log(selectedRow);

  const search = async (searchValue:SearchType) => {
    setLoading(true);

    let url = '/api/items?';
    if (searchValue.placeId) {
      url += `placeId=${searchValue.placeId}&`;
    }
    if (searchValue.itemType) {
      url += `itemType=${searchValue.itemType}&`;
    }
    if (searchValue.itemName) {
      url += `itemName=${searchValue.itemName}`;
    }

    await axios.get(url).then((response) => {
      setList(response.data);
    }).catch(error => {
      console.log(error);
    }).finally(() => setLoading(false));
  };

  const getComboData = async () => {
    await axios.get('/api/places').then((response) => {
      setPlaceList(response.data);
    }).catch((error) => console.log(error));
  }

  const onSelect = (row:any) => {
    selectedRow = row;
  }

  useEffect(() => {
    getComboData();
    search({});
  }, []);

  return (
    <Content className='item-list'>
      <ContentTopBar>
        <p className='title'>품목 관리</p>
        <div className='buttons'>
          <Button onClick={toCreation}>생성</Button>
          <Button variant='dark' onClick={toDetail}>수정</Button>
        </div>
      </ContentTopBar>
      <Search searchItems={searchItems} search={search} />
      <Table data={list} column={column} onSelect={onSelect} />
      {isLoading ? <Loading></Loading> : null}
    </Content>
  );
};

export default Item;