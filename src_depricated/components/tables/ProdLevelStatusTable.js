import PropTypes from 'prop-types';
import { useMemo, useState } from 'react';

// material-ui
import { Table, TableBody, TableCell, TableHead, TableRow, TableFooter } from '@mui/material';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@mui/material';
// third-party
import { useTable } from 'react-table';

// project import
import ProdDriveDetailedTable from './ProdDriveDetailedTable';
import axios from 'api/axios';
import MainCard from '../MainCard';
import ScrollX from '../ScrollX';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, striped }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Table {...getTableProps()} sx={{ overflow: 'hidden' }}>
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
      <TableFooter></TableFooter>
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
  const [open, setOpen] = useState(false);
  const [OdName, setOdName] = useState('');
  const [dialogData, setDialogData] = useState('');
  //const [loading, setLoading] = useState(true);

  const handleOpenDrive = async (driveName) => {
    const apiUrl = `/api/reports/prodoredrive/${driveName}`;
    setOdName(driveName.slice(0, -5));
    try {
      const response = await axios.get(apiUrl);
      const dialogdata = response.data;
      setDialogData(dialogdata);
      setOpen(true);
      //setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const columns = useMemo(
    () => [
      {
        Header: 'Ore Drive',
        accessor: 'oredrive',
        Cell: ({ value, row }) => (
          <a href="#" onClick={() => handleOpenDrive(row.original.pitram_name)}>
            {value}
          </a>
        ),
        className: ''
      },
      {
        Header: 'Current Ring',
        accessor: 'bogging_ring'
      },
      {
        Header: 'Avail Tonnes',
        accessor: 'to_bog_tonnes',
        className: ''
      },
      {
        Header: 'Bog Comment',
        accessor: 'bog_comment',
        className: ''
      },
      {
        Header: 'Drilled to',
        accessor: 'last_drilled',
        className: ''
      },
      {
        Header: 'Charged rings',
        accessor: 'charged_rings',
        Cell: ({ value }) => value.map((obj) => `${obj.ring_num_prefixed}${obj.fireby} ${obj.detonator}`).join(', ')
      }
    ],
    []
  );
  return (
    <MainCard content={false} title={title}>
      <ScrollX>
        <ReactTable columns={columns} data={data} striped={striped} />
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="xl" fullscreen="true">
          <DialogTitle>Detailed History - {OdName}</DialogTitle>
          <DialogContent>
            <ProdDriveDetailedTable data={dialogData} />
          </DialogContent>
          <DialogActions>
            <Button onClick={handleClose}>Close</Button>
          </DialogActions>
        </Dialog>
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
