import React, { useEffect, useState } from 'react';
import './component.scss';
import { Button } from 'react-bootstrap';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';

type Column = {
  field: string,
  label: string,
  width: number,
  type: string,
}

type Data = {
  [key:string]: string | number
}

type PropsType = {
  data: Data[],
  column: Column[],
  onSelect: Function
}

type Pagination = {
  totalPage: number,
  currentPage: number
}
const Table = ({data, column, onSelect}: PropsType) => {
  
  const defaultPage:Pagination = {
    totalPage: 1,
    currentPage: 1
  }

  const [ selectedRow, setSelectedRow] = useState({});

  const [tableData, setTableData] = useState<Data[]>([]);
  const [pageData, setPageData] = useState<Data[]>([]);
  const [tableColumn, setTableColumn] = useState<Column[]>([]);
  const [pagination, setPagination] = useState<Pagination>(defaultPage);
  
  useEffect(() => {
    if (data) {
      setTableData(data);
      setPageData(data.slice(0, 15));
    }
    if (column) {
      setTableColumn(column);
    }
    const totalPage = data.length % 15 === 0 ? data.length / 15 : Math.floor(data.length / 15)  + 1;
    setPagination({totalPage: totalPage, currentPage: 1});
  }, [data, column]);

  const createPageButtons = () => {
    let buttons = [];
    buttons.push(<Button key='prev' variant='outline-dark' size='sm' onClick={prevPage}><BsChevronLeft />이전</Button>);
    for (let i = 1; i <= pagination.totalPage; i++) {
      
      if (pagination.currentPage === i) {
        buttons.push(<Button key={i} size='sm' variant='dark'>{i}</Button>);
      } else {
        buttons.push(<Button key={i} size='sm' variant='outline-dark' onClick={() => changePage(i)}>{i}</Button>);
      }
    }
    buttons.push(<Button key='next' variant='outline-dark' size='sm' onClick={nextPage}>다음<BsChevronRight/></Button>);
    return buttons;
  }

  const prevPage = () => {
    if (pagination.currentPage - 1 >= 1) {
      const pageNumber = pagination.currentPage - 1;
      setPagination({...pagination, currentPage: pageNumber});
      changePageData(pageNumber);
    }
  }

  const nextPage = () => {
    if (pagination.currentPage + 1 <= pagination.totalPage) {
      const pageNumber = pagination.currentPage + 1;
      setPagination({...pagination, currentPage: pageNumber});
      changePageData(pageNumber);
    }
  }

  const changePage = (pageNumber:number) => {
    setPagination({...pagination, currentPage: pageNumber});
    changePageData(pageNumber);
  }

  const changePageData = (pageNumber:number) => {
    const start = 15 * (pageNumber - 1);
    const end = start + 15;
    setPageData(tableData.slice(start, end));
    setSelectedRow({});
  }

  const onSelectRow = (row:any) => {
    setSelectedRow(row);
    onSelect(row);
  }

  return (
    <section className='custom-table'>
      <div className='custom-table-wrapper'>
        <table>
          <thead>
            <tr>
              <th className='index'>#</th>
              {tableColumn.map(col => <th key={col.field} style={{flex:col.width}}>{col.label}</th>)}
            </tr>
          </thead>
          <tbody>
            {data.length > 0 ? pageData.map((row,index) =>
               <tr key={index} onClick={() => onSelectRow(row)} className={selectedRow === row ? 'selected' : ''}>
                <td className='index'>{index + 1}</td>
                {tableColumn.map(col => <td key={col.field} style={{flex:col.width}}>{col.type === 'number' ? row[col.field].toLocaleString() : row[col.field]}</td>)}
               </tr>
              ) : <tr className='empty'><td rowSpan={tableColumn.length + 1}>데이터가 없습니다</td></tr>
            }
          </tbody>
        </table>
      </div>
      <div className='custom-table-footer'>
        <div className='total'>Total {data.length}</div>
        <div className='pagination'>
          {data.length > 0 && createPageButtons()}
        </div>
      </div>
    </section>
  );
};

export default Table;