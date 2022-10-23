import PropTypes from 'prop-types';
import { useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';

// material-ui
import { Box, Link, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';

// third-party
import NumberFormat from 'react-number-format';

// project import
import Dot from '../../../components/@extended/Dot';

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

// ==============================|| ORDER TABLE - HEADER CELL ||============================== //

const headCells = [
  {
    id: 'tracking_no',
    align: 'left',
    disablePadding: false,
    label: 'Heading',
    colspan: 1,
    rowspan: 2
  },
  {
    id: 'mon',
    align: 'center',
    disablePadding: true,
    label: 'Mon',
    colspan: 2
  },
  {
    id: 'tue',
    align: 'center',
    disablePadding: true,
    label: 'Tue',
    colspan: 2
  },
  {
    id: 'wed',
    align: 'center',
    disablePadding: true,
    label: 'Wed',
    colspan: 2
  },
  {
    id: 'thu',
    align: 'center',
    disablePadding: true,
    label: 'Thu',
    colspan: 2
  },
  {
    id: 'fri',
    align: 'center',
    disablePadding: true,
    label: 'Fri',
    colspan: 2
  },
  {
    id: 'sat',
    align: 'center',
    disablePadding: true,
    label: 'Sat',
    colspan: 2
  },
  {
    id: 'sun',
    align: 'center',
    disablePadding: true,
    label: 'Sun',
    colspan: 2
  },
  {
    id: 'totals',
    align: 'center',
    disablePadding: false,
    label: 'Total',
    rowspan: 2
  },
  {
    id: 'target',
    align: 'center',
    disablePadding: false,
    label: 'Target',
    rowspan: 2
  }
];

// ==============================|| ORDER TABLE - HEADER ||============================== //

function OrderTableHead({ order, orderBy }) {
  return (
    <TableHead>
      <TableRow>
        {headCells.map((headCell) => (
          <TableCell
            key={headCell.id}
            align={headCell.align}
            padding={headCell.disablePadding ? 'none' : 'normal'}
            sortDirection={orderBy === headCell.id ? order : false}
            colSpan={headCell.colspan}
            rowSpan={headCell.rowspan}
          >
            {headCell.label}
          </TableCell>
        ))}
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

OrderTableHead.propTypes = {
  order: PropTypes.any,
  orderBy: PropTypes.string
};

// ==============================|| ORDER TABLE - STATUS ||============================== //

const OrderStatus = ({ status }) => {
  let color;
  let title;

  switch (status) {
    case 0:
      color = 'warning';
      title = 'At Risk';
      break;
    case 1:
      color = 'success';
      title = 'On Track';
      break;
    case 2:
      color = 'error';
      title = 'Unlikely';
      break;
    default:
      color = 'primary';
      title = 'OK';
  }

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Dot color={color} />
      <Typography>{title}</Typography>
    </Stack>
  );
};

OrderStatus.propTypes = {
  status: PropTypes.number
};

// ==============================|| ORDER TABLE ||============================== //

export default function OrderTable() {
  const [order] = useState('asc');
  const [orderBy] = useState('tracking_no');

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
          <OrderTableHead order={order} orderBy={orderBy} />
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
                  <TableCell align="left">
                    <OrderStatus status={row.carbs} />
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
