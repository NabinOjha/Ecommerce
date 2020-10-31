import React from 'react';

import './Table.scss';

import Pagination from './../Pagination/Pagination';

const Table = ({ limit, tableData, pagination }) => {
  const renderHeading = tableData.headings.map((heading, index) => (
    <th className='table-head__col' key={index}>
      {heading}
    </th>
  ));

  const renderBody = tableData.body.map((data, index) => (
    <tr className='table-body__row' key={index}>
      {Object.values(data).map((value, index) => (
        <td className='table-body__cell' key={index}>
          {value}
        </td>
      ))}
    </tr>
  ));

  return (
    <>
      <table className='table'>
        <thead className='table-head'>
          <tr className='table-head__row'>{renderHeading}</tr>
        </thead>
        <tbody className='table-body'>{renderBody}</tbody>
      </table>
      {pagination && <Pagination limit={limit} />}
    </>
  );
};

export default Table;
