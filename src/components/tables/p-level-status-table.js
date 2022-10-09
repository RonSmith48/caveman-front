import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter } from '@mui/material';

// third-party
import { useTable } from 'react-table';

// project import
import MainCard from '../../components/MainCard';
import ScrollX from '../../components/ScrollX';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, striped }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow key={i} {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column, index) => (
              <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                {column.render('Header')}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()} {...(striped && { className: 'striped' })}>
        {rows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow {...row.getRowProps()} key={i}>
              {row.cells.map((cell, i) => (
                <TableCell key={i} {...cell.getCellProps([{ className: cell.column.className }])}>
                  {cell.render('Cell')}
                </TableCell>
              ))}
            </TableRow>
          );
        })}
      </TableBody>
      <TableFooter>
        <TableCell>Total Broken Stock</TableCell>
      </TableFooter>
    </Table>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  striped: PropTypes.bool
};

// ==============================|| REACT TABLE - BASIC ||============================== //

const BasicTable = ({ data, striped, title }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Ore Drive',
        accessor: 'ore_drive'
      },
      {
        Header: 'Current Ring',
        accessor: 'curr_ring'
      },
      {
        Header: 'Avail Tonnes',
        accessor: 'avail_tonnes',
        className: ''
      },
      {
        Header: 'Bog Comment',
        accessor: 'bog_comment',
        className: ''
      },
      {
        Header: 'Drilled to',
        accessor: 'drilled_to',
        className: ''
      },
      {
        Header: 'Charged to',
        accessor: 'charged_to'
      },
      {
        Header: 'Charge Comment',
        accessor: 'charge_comment'
      }
    ],
    []
  );

  return (
    <MainCard content={false} title={title}>
      <ScrollX>
        <ReactTable columns={columns} data={data} striped={striped} />
      </ScrollX>
    </MainCard>
  );
};

BasicTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string
};

export default BasicTable;
