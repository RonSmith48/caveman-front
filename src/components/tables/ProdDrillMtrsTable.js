/* eslint-disable react/prop-types */
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Table, TableBody, TableCell, TableContainer, TableHead, TableFooter, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

function createData(trackingNO, name, fat, carbs, protein) {
  return { trackingNO, name, fat, carbs, protein };
}

const rows = [
  createData(84564564, 'Camera Lens', 40, 2, 40570),
  createData(98764564, 'Laptop', 300, 0, 180139),
  createData(98756325, 'Mobile', 355, 1, 90989),
  createData(98652366, 'Handset', 50, 1, 10239),
  createData(13286564, 'Computer Accessories', 100, 1, 83348),
  createData(86739658, 'TV', 99, 0, 410780),
  createData(13256498, 'Keyboard', 125, 2, 70999),
  createData(98753263, 'Mouse', 89, 2, 10570),
  createData(98753275, 'Desktop', 185, 1, 98063),
  createData(98753291, 'Chair', 100, 0, 14001)
];

function descendingComparator(a, b, orderBy) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }
  if (b[orderBy] > a[orderBy]) {
    return 1;
  }
  return 0;
}

function getComparator(order, orderBy) {
  return order === 'desc' ? (a, b) => descendingComparator(a, b, orderBy) : (a, b) => -descendingComparator(a, b, orderBy);
}

function stableSort(array, comparator) {
  const stabilizedThis = array.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) {
      return order;
    }
    return a[1] - b[1];
  });
  return stabilizedThis.map((el) => el[0]);
}

// ==============================|| ORDER TABLE - HEADER ||============================== //

function PDTableHead({ dmdates }) {
  console.log('dates', dmdates);
  return (
    <TableHead>
      <TableRow>
        <TableCell key="heading" align="left" padding="normal" rowSpan="2">
          Heading
        </TableCell>
        <TableCell key="mon" align="center" padding="none" colSpan="2">
          Mon - {dmdates.dates['0']}
        </TableCell>
        <TableCell key="tue" align="center" padding="none" colSpan="2">
          Tue - {dmdates.dates['1']}
        </TableCell>
        <TableCell key="wed" align="center" padding="none" colSpan="2">
          Wed - {dmdates.dates['2']}
        </TableCell>
        <TableCell key="thu" align="center" padding="none" colSpan="2">
          Thu - {dmdates.dates['3']}
        </TableCell>
        <TableCell key="fri" align="center" padding="none" colSpan="2">
          Fri - {dmdates.dates['4']}
        </TableCell>
        <TableCell key="sat" align="center" padding="none" colSpan="2">
          Sat - {dmdates.dates['5']}
        </TableCell>
        <TableCell key="sun" align="center" padding="none" colSpan="2">
          Sun - {dmdates.dates['6']}
        </TableCell>
        <TableCell key="totals" align="center" padding="normal" rowSpan="2">
          Total
        </TableCell>
      </TableRow>
      <TableRow>
        <TableCell align="center" padding="none">
          DS
        </TableCell>
        <TableCell align="center" padding="none">
          NS
        </TableCell>
        <TableCell align="center" padding="none">
          DS
        </TableCell>
        <TableCell align="center" padding="none">
          NS
        </TableCell>
        <TableCell align="center" padding="none">
          DS
        </TableCell>
        <TableCell align="center" padding="none">
          NS
        </TableCell>
        <TableCell align="center" padding="none">
          DS
        </TableCell>
        <TableCell align="center" padding="none">
          NS
        </TableCell>
        <TableCell align="center" padding="none">
          DS
        </TableCell>
        <TableCell align="center" padding="none">
          NS
        </TableCell>
        <TableCell align="center" padding="none">
          DS
        </TableCell>
        <TableCell align="center" padding="none">
          NS
        </TableCell>
        <TableCell align="center" padding="none">
          DS
        </TableCell>
        <TableCell align="center" padding="none">
          NS
        </TableCell>
      </TableRow>
    </TableHead>
  );
}

// ==============================|| ORDER TABLE ||============================== //

export default function PDrillActualsTable(dates, mtrs) {
  const [order] = useState('asc');
  const [orderBy] = useState('tracking_no');

  console.log(dates, mtrs);

  return (
    <Box>
      <TableContainer
        sx={{
          width: '100%',
          overflowX: 'auto',
          position: 'relative',
          display: 'block',
          maxWidth: '100%',
          '& td, & th': { whiteSpace: 'nowrap' }
        }}
      >
        <Table
          aria-labelledby="tableTitle"
          size="small"
          sx={{
            '& .MuiTableCell-root:first-of-type': {
              pl: 2
            },
            '& .MuiTableCell-root:last-child': {
              pr: 3
            }
          }}
        >
          <PDTableHead dmdates={dates} />
          <TableBody>
            {stableSort(rows, getComparator(order, orderBy)).map((row, index) => {
              const labelId = `enhanced-table-checkbox-${index}`;

              return (
                <TableRow
                  hover
                  role="checkbox"
                  sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                  tabIndex={-1}
                  key={row.trackingNO}
                >
                  <TableCell component="th" id={labelId} scope="row" align="left">
                    <Link color="secondary" component={RouterLink} to="">
                      {row.trackingNO}
                    </Link>
                  </TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="center">{row.fat}</TableCell>
                  <TableCell align="right">
                    <NumberFormat value={row.protein} displayType="text" thousandSeparator />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
          <TableFooter>
            <TableCell align="left">
              <Typography fontWeight="bold">Totals</Typography>
            </TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="center"></TableCell>
            <TableCell align="right"></TableCell>
          </TableFooter>
        </Table>
      </TableContainer>
    </Box>
  );
}
