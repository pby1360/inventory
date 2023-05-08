import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import Content from 'layout/Content';
import Search from 'components/Search';
import ContentTopBar from 'layout/ContentTopBar';
import Table from 'components/Table';
import Loading from 'components/Loading';
import { axios } from 'components/CustomAxios';

import './item.scss';

import { ItemType, SearchType } from 'components/Types';
import { useNavigate } from 'react-router-dom';

const Item = () => {

  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState<ItemType>({
    id: undefined,
    placeId: undefined,
    name: '',
    type: '',
    price: 0,
    unit: '',
    spec: '',
    remark: '',
  });

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
      width: 2,
      type: 'text',
    },
    {
      field: 'name',
      label: '품명',
      width: 3,
      type: 'text',
    },
    {
      field: 'type',
      label: '품목 유형',
      width: 1,
      type: 'text',
    },
    {
      field: 'unit',
      label: '단위',
      width: 1,
      type: 'text',
    },
    {
      field: 'price',
      label: '단가',
      width: 1,
      type: 'number',
    },
    {
      field: 'spec',
      label: '규격',
      width: 3,
      type: 'text',
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
      label: '품명',
      type: 'text',
      width: 3
    }
  ];

  const toCreation = () => navigate('/item/creation');
  
  const toDetail = () => navigate(`/item/${selectedRow.id}`);

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

  const getPlaceList = async () => {
    await axios.get('/api/places').then((response) => {
      setPlaceList(response.data);
    }).catch((error) => console.log(error));
  }

  const onSelect = (row:ItemType) => {
    setSelectedRow(row);
  }

  useEffect(() => {
    getPlaceList();
    search({});
  }, []);

  return (
    <Content className='item-list'>
      <ContentTopBar>
        <p className='title'>품목 관리</p>
        <div className='buttons'>
          <Button onClick={toCreation}>생성</Button>
          <Button variant='dark' onClick={toDetail} disabled={!selectedRow.id}>상세</Button>
        </div>
      </ContentTopBar>
      <Search searchItems={searchItems} search={search} />
      <Table data={list} column={column} onSelect={onSelect} />
      {isLoading ? <Loading></Loading> : null}
    </Content>
  );
};

export default Item;