import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Chip, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useFilters, useRowSelect, useTable, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import { IndeterminateCheckbox, TablePagination, TableRowSelection } from 'components/third-party/ReactTable';

//import { renderFilterTypes } from 'utils/react-table';

// ==============================|| REACT TABLE ||============================== //

const SelectionCell = ({ row }) => <IndeterminateCheckbox {...row.getToggleRowSelectedProps()} />;
const SelectionHeader = ({ getToggleAllPageRowsSelectedProps }) => (
  <IndeterminateCheckbox indeterminate {...getToggleAllPageRowsSelectedProps()} />
);

SelectionCell.propTypes = {
  row: PropTypes.object
};

SelectionHeader.propTypes = {
  getToggleAllPageRowsSelectedProps: PropTypes.func
};

function ReactTable({ columns, data, selectedrows }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    rows,
    page,
    gotoPage,
    setPageSize,
    state: { selectedRowIds, pageIndex, pageSize }
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 5, selectedRowIds: selectedrows }
    },
    useFilters,
    usePagination,
    useRowSelect,
    (hooks) => {
      hooks.allColumns.push((columns) => [
        {
          id: 'row-selection-chk',
          accessor: 'Selection',
          Header: SelectionHeader,
          Cell: SelectionCell
        },
        ...columns
      ]);
    }
  );

  return (
    <>
      <MainCard title="Allocate Drilled Meters" content={false}>
        <ScrollX>
          <TableRowSelection selected={Object.keys(selectedRowIds).length} />
          <Stack spacing={3}>
            <Table {...getTableProps()}>
              <TableHead>
                {headerGroups.map((headerGroup, i) => (
                  <TableRow key={i} {...headerGroup.getHeaderGroupProps()} sx={{ '& > th:first-of-type': { width: '58px' } }}>
                    {headerGroup.headers.map((column, index) => (
                      <TableCell key={index} {...column.getHeaderProps([{ className: column.className }])}>
                        {column.render('Header')}
                      </TableCell>
                    ))}
                  </TableRow>
                ))}
              </TableHead>
              <TableBody {...getTableBodyProps()}>
                {page.map((row, i) => {
                  prepareRow(row);
                  return (
                    <TableRow
                      key={i}
                      {...row.getRowProps()}
                      onClick={() => {
                        row.toggleRowSelected();
                      }}
                      sx={{
                        cursor: 'pointer',
                        bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit'
                      }}
                    >
                      {row.cells.map((cell, index) => (
                        <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                          {cell.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
                <TableRow>
                  <TableCell sx={{ p: 2, pb: 0 }} colSpan={8}>
                    <TablePagination gotoPage={gotoPage} rows={rows} setPageSize={setPageSize} pageSize={pageSize} pageIndex={pageIndex} />
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Stack>
        </ScrollX>
      </MainCard>
    </>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array,
  selectedrows: PropTypes.object
};

// ==============================|| REACT TABLE - ROW SELECTION ||============================== //

const Designfor = ({ value }) => {
  switch (value) {
    case 'solo':
      return <Chip color="error" label="Solo" size="small" variant="light" />;
    case 'simba':
      return <Chip color="success" label="Simba" size="small" variant="light" />;
    default:
      return <Chip color="secondary" label="Unspecified" size="small" variant="light" />;
  }
};

Designfor.propTypes = {
  value: PropTypes.string
};

const ProdRingsDrillDesMarked = (data) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Ring',
        accessor: 'ring'
      },
      {
        Header: 'Designed for',
        accessor: 'designfor',
        Cell: Designfor
      },
      {
        Header: 'Marked up',
        accessor: 'markup'
      },
      {
        Header: 'Meters',
        accessor: 'meters',
        Cell: ({ value }) => parseFloat(value).toFixed(1)
      }
    ],
    []
  );

  return <ReactTable columns={columns} data={data.data.adm} selectedrows={data.data.checkboxes} />;
};

export default ProdRingsDrillDesMarked;
