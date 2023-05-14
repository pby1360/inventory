import React, { useState } from 'react';
import './component.scss';
import { Button, Form, InputGroup } from 'react-bootstrap';
import { BiSearch } from 'react-icons/bi';
import { SearchType } from 'components/Types';

interface SelectOption {
  value: string|number;
  text: string;
}

interface SearchItem {
  [index: string]: number | string | SelectOption[] | undefined;
  field: string;
  label: string;
  type: string;
  width: number;
  options?: SelectOption[];
}

type PropsTpye = {
  searchItems: SearchItem[],
  search: Function,
  onSelect?: Function
}

const Search = ({searchItems, search, onSelect}: PropsTpye) => {  
  
  const [searchValue, setSearchValue] = useState<SearchType>({});

  const createItem = (item:SearchItem) => {
    if (item.type === 'select') {
      return (
        <Form.Group key={item.field} style={{flex:`${item.width}`}} className='search-item m-1'>
          <Form.Label className='mb-0 col-form-label-sm'>{item.label}</Form.Label>
          <Form.Control value={searchValue[item.field]} onChange={handleChange} name={item.field} className='rounded-pill' as='select'>
            <option value=''>선택하세요</option>
            {item.options ? item.options.map((option:SelectOption) => <option key={option.value} value={option.value}>{option.text}</option>) : null}
          </Form.Control>
        </Form.Group>
      )
    } else {
      return (
        <Form.Group key={item.field} style={{flex:`${item.width}`}} className='search-item m-1'>
          <Form.Label className='mb-0 col-form-label-sm'>{item.label}</Form.Label>
            <InputGroup>
              <InputGroup.Text className='rounded-input-icon'>
                <BiSearch />
              </InputGroup.Text>
              <Form.Control value={searchValue[item.field]} onChange={handleChange} name={item.field} type='text' className='rounded-input' placeholder='검색어를 입력하세요' />
            </InputGroup>
        </Form.Group>
      )
    }
    
  }

  const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    search(searchValue);
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue({ ...searchValue, [e.target.name]: e.target.value});
    if (onSelect) {
      onSelect({ ...searchValue, [e.target.name]: e.target.value});
    }
    
  }

  return (
    <section className='search'>
      <Form onSubmit={handleSubmit} className='search-form'>
        {searchItems.map(item => createItem(item))}
        <div className='search-button m-1'>
          <Button type='submit' variant='dark' className='rounded-pill'>검색</Button>
        </div>
      </Form>
    </section>
  );
};

export default Search;