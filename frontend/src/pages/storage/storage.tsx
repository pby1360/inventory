import React, { useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';

import Content from 'layout/Content';
import Search from 'components/Search';
import ContentTopBar from 'layout/ContentTopBar';
import Table from 'components/Table';
import Loading from 'components/Loading';
import { axios } from 'components/CustomAxios';

import './storage.scss';

import { StorageType, SearchType } from 'components/Types';
import { useNavigate } from 'react-router-dom';

const Storage = () => {

  const navigate = useNavigate();

  const [selectedRow, setSelectedRow] = useState<StorageType>({
    id: undefined,
    placeId: undefined,
    name: '',
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
      width: 4,
      type: 'text',
    },
    {
      field: 'name',
      label: '저장소명',
      width: 6,
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
      field: 'storageName',
      label: '저장소명',
      type: 'text',
      width: 3
    }
  ];

  const toCreation = () => navigate('/storage/creation');
  
  const toDetail = () => navigate(`/storage/${selectedRow.id}`);

  const search = async (searchValue:SearchType) => {
    setLoading(true);

    let url = '/api/storages?';
    if (searchValue.placeId) {
      url += `placeId=${searchValue.placeId}&`;
    }
    if (searchValue.storageName) {
      url += `storageName=${searchValue.storageName}`;
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

  const onSelect = (row:StorageType) => {
    setSelectedRow(row);
  }

  useEffect(() => {
    getPlaceList();
    search({});
  }, []);

  return (
    <Content className='storage-list'>
      <ContentTopBar>
        <p className='title'>저장소 관리</p>
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

export default Storage;