import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Content from '../../layout/Content';
import ContentTopBar from 'layout/ContentTopBar';
import Search from 'components/Search';
import Table from 'components/Table';
import Loading from 'components/Loading';

import { axios } from 'components/CustomAxios';

import './inventory.scss';
import { Button } from 'react-bootstrap';

import { InventoryType, SearchType } from 'components/Types';


const Inventory = () => {

  const navigate = useNavigate();

  interface Place {
    placeId: number;
    placeName: string;
  }

  interface Storage {
    id: number;
    name: string;
  }

  const [placeList, setPlaceList] = useState<Place[]>([]);
  const [storageList, setStorageList] = useState<Storage[]>([]);
  
  const [list, setList] = useState([]);

  const [isLoading, setLoading] = useState(false);

  const [selectedRow, setSelectedRow] = useState<InventoryType>({
    id: undefined,
    placeId: undefined,
    storageId: undefined,
    itemId: undefined,
    quantity: undefined,
    createdAt: '',
    createdBy: '',
    modifiedAt: '',
    modifiedBy: '',
    remark: '',
  });

  const [searchValues, setSearchValues] = useState<{[key: string]: number | string}>({});

  const column = [
    {
      field: 'placeName',
      label: '사업장',
      width: 3,
      type: 'text',
    },
    {
      field: 'storageName',
      label: '저장소',
      width: 3,
      type: 'text',
    },
    {
      field: 'itemType',
      label: '품목 유형',
      width: 2,
      type: 'text',
    },
    {
      field: 'itemName',
      label: '품목',
      width: 3,
      type: 'text',
    },
    {
      field: 'quantity',
      label: '수량',
      width: 2,
      type: 'number',
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
    // {
    //   field: 'storageId',
    //   label: '저장소',
    //   type: 'select',
    //   width: 1,
    //   options: storageList.map(storage => ({value: storage.id, text: storage.name}))
    // },
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

  const toCreation = () => navigate('/inventory/creation');
  
  const toDetail = () => {
    // navigate(`/inventory/${selectedRow.id}`)
  };

  const onSelect = (row:InventoryType) => {
    setSelectedRow(row);
  }

  const search = async (searchValue:SearchType) => {
    setLoading(true);

    let url = '/api/inventories?';
    if (searchValue.placeId) {
      url += `placeId=${searchValue.placeId}&`;
    }
    if (searchValue.storageId) {
      url += `storageId=${searchValue.storageId}&`;
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

  // const getStorageList = async () => {
  //   await axios.get('/api/storages').then((response) => {
  //     setPlaceList(response.data);
  //   }).catch((error) => console.log(error));
  // }

  const onSelectSearchItem = (values:any) => {
    setSearchValues(values);
  }
  useEffect(() => {
    // if (searchValues.placeId) {
    //   getStorageList();
    // } else {
    //   search({});
    //   getPlaceList();
    // }
    search({});
    getPlaceList();
    
  }, []);

  // useEffect(() => {
  //   // if (searchValue.placeId) {
  //   //   getStorageList(formData.placeId);
  //   //   getItemList(formData.placeId);
  //   // } else {
  //   //   formData.storageId = undefined;
  //   //   formData.itemId = undefined;
  //   //   setStorageList([]);
  //   //   setItemList([]);
  //   //   getPlaceList();
  //   // }
    
  // }, [searchValue.placeId]);

  return (
    <Content className='inventory-list'>
      <ContentTopBar>
        <p className='title'>품목 관리</p>
        <div className='buttons'>
          <Button onClick={toCreation}>재고등록</Button>
          <Button variant='outline-primary' disabled={!selectedRow.id}>재고사용</Button>
          <Button variant='dark' onClick={toDetail} disabled={!selectedRow.id}>상세보기</Button>
        </div>
      </ContentTopBar>
      <Search searchItems={searchItems} search={search} onSelect={onSelectSearchItem} />
      <Table data={list} column={column} onSelect={onSelect} />
      {isLoading ? <Loading></Loading> : null}
    </Content>
  );
};

export default Inventory;