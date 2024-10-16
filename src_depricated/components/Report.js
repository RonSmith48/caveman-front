// This is just rough code...  don't use it yet

import React, { useRef } from 'react';
import printJS from 'print-js';
import { useReactTable } from 'react-table';

const TableComponent = () => {
  const tableRef = useRef();
  const data = React.useMemo(
    () => [
      {
        col1: 'Row 1, Column 1',
        col2: 'Row 1, Column 2'
      },
      {
        col1: 'Row 2, Column 1',
        col2: 'Row 2, Column 2'
      }
    ],
    []
  );

  const columns = React.useMemo(
    () => [
      {
        Header: 'Column 1',
        accessor: 'col1'
      },
      {
        Header: 'Column 2',
        accessor: 'col2'
      }
    ],
    []
  );

  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow, getHtmlString } = useReactTable({
    columns,
    data
  });

  const handlePrint = () => {
    const tableHtml = getHtmlString(tableRef.current);
    printJS({ printable: tableHtml, type: 'html' });
  };

  return (
    <>
      <div ref={tableRef}>
        <table {...getTableProps()}>
          <thead>
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>;
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      <button onClick={handlePrint}>Print</button>
    </>
  );
};

export default TableComponent;
