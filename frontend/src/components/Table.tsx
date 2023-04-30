import React, { useEffect, useState } from 'react';
import './component.scss';

const Table = ({data, column}: any) => {
  const [tableData, setTableData] = useState([]);
  const [tableColumn, setTableColumn] = useState([]);
  
  useEffect(() => {
    if (data) {
      setTableData(data);
    }
    if (column) {
      setTableColumn(column);
    }
  }, []);
  return (
    <section className='table'>
      <table>
        <thead></thead>
        <tbody></tbody>
        <tfoot></tfoot>
      </table>
    </section>
  );
};

export default Table;