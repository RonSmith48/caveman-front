import PropTypes from 'prop-types';
import { useState, useEffect, useMemo } from 'react';
import axiosServices from 'utils/axios';

// material-ui
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Grid,
  TextField,
  Typography,
  TableFooter,
  IconButton,
  Tooltip,
  CircularProgress
} from '@mui/material';
//import { borders } from '@mui/system';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';

import { PrinterTwoTone } from '@ant-design/icons';

// third-party
import { useTable } from 'react-table';

// project import
import MainCard from '../MainCard';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, striped, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable({
    columns,
    data
  });

  return (
    <Table {...getTableProps()} size="small">
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

const BasicTable = () => {
  const baseURL = '/api/reports/dcf/';
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [pickerDate, setPickerDate] = useState(yesterday_date());
  const [pickValue, setPickValue] = useState(formatDate(yesterday_date()));
  const [cssBorderColor, setBorderColor] = useState();

  useEffect(() => {
    axiosServices
      .get(baseURL + pickValue)
      .then((response) => {
        setData(response.data.dcf);
        setLoading(false);
        setBorderColor(table_border_color(response.data.dcf));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pickValue]);

  const columns = useMemo(
    () => [
      {
        Header: 'Location',
        accessor: 'location.value'
      },
      {
        Header: 'New Status',
        accessor: 'state.value'
      },
      {
        Header: 'Verifier',
        accessor: 'verifier.value',
        className: ''
      }
    ],
    []
  );
  const handleDateChange = (val) => {
    setPickerDate(val); // whole date
    setPickValue(formatDate(val)); // formatted date for API get
  };
  const handlePrint = () => {
    window.print();
    console.log('printing');
  };

  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Grid>
      <MainCard style={{ borderLeft: '0.2rem solid', borderLeftColor: cssBorderColor }}>
        <Grid item container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h5">Drill Charge Fire (DCF)</Typography>
          <Grid>
            <LocalizationProvider dateAdapter={AdapterDateFns}>
              <DesktopDatePicker
                label="DCF Report Date"
                format="dd/MM/yyyy"
                disableFuture={true}
                value={pickerDate}
                onChange={handleDateChange}
                textField={(params) => <TextField {...params} sx={{ width: '10rem' }} />}
              />
            </LocalizationProvider>
            <Tooltip title="Print" placement="top">
              <IconButton
                color="primary"
                aria-label="print this"
                component="label"
                style={{ verticalAlign: 'bottom', paddingBottom: '0.75rem' }}
                onClick={handlePrint}
              >
                <PrinterTwoTone style={{ fontSize: '1.5rem', color: 'inherit' }} />
              </IconButton>
            </Tooltip>
          </Grid>
        </Grid>
        <ReactTable columns={columns} data={data} />
      </MainCard>
    </Grid>
  );
};

BasicTable.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string
};

export default BasicTable;

// =====================|| Functions ||======================================

function table_border_color(data) {
  if (data) {
    if (data.length == 0) {
      return 'lightgrey';
    } else {
      data.forEach((element) => {
        if (element.verifier.value == '') {
          return 'lightgrey';
        }
      });
      return 'LimeGreen';
    }
  }
  return 'lightgrey';
}

function yesterday_date() {
  var date = new Date();
  date.setDate(date.getDate() - 1);
  return date;
}

function formatDate(date) {
  var d = new Date(date),
    month = '' + (d.getMonth() + 1),
    day = '' + d.getDate(),
    year = d.getFullYear();

  if (month.length < 2) month = '0' + month;
  if (day.length < 2) day = '0' + day;

  return [year, month, day].join('-');
}
