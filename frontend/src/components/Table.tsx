import React, { useEffect, useState } from 'react';
import './component.scss';
import { Button } from 'react-bootstrap';

type Column = {
  field: string,
  label: string,
  width: number
}

type Data = {
  [key:string]: string | number
}

type PropsType = {
  data: Data[],
  column: Column[]
}

type Pagination = {
  totalPage: number,
  currentPage: number
}
const Table = ({data, column}: PropsType) => {
  const defaultPage:Pagination = {
    totalPage: 5,
    currentPage: 1
  }

  const [tableData, setTableData] = useState<Data[]>([]);
  const [tableColumn, setTableColumn] = useState<Column[]>([]);
  const [pagination, setPagination] = useState<Pagination>(defaultPage);
  
  useEffect(() => {
    if (data) {
      setTableData(data.splice(0, 15));
    }
    if (column) {
      setTableColumn(column);
    }
    pageButtons = createPageButtons();
  }, []);

  let pageButtons;

  const createPageButtons = () => {
    let buttons = <Button>2</Button>;
    const totalPage = data.length % 15 === 0 ? data.length / 15 + 1 : Math.floor(data.length / 15);
    console.log(totalPage);
    // for (let i = 0; i < pagination.)
    return buttons;
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
            {tableData.map((row,index) =>
               <tr key={index}>
                <td className='index'>{index + 1}</td>
                {tableColumn.map(col => <td key={col.field} style={{flex:col.width}}>{row[col.field]}</td>)}
               </tr>
              )
            }
          </tbody>
        </table>
      </div>
      <div className='custom-table-footer'>
        <div className='total'>Total {data.length}</div>
        <div className='pagination'>
          <Button>이전</Button>
          {pageButtons}
          <Button>다음</Button>
        </div>
      </div>
    </section>
  );
};

export default Table;