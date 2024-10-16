import PropTypes from 'prop-types';
import { useMemo } from 'react';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import { Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';

// third-party
import { useFilters, useTable, useRowSelect, usePagination } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import VerifyUpdatesButton from 'components/VerifyUpdatesButton';
import { renderFilterTypes } from 'utils/react-table';
import { IndeterminateCheckbox, TableRowSelection } from 'components/third-party/ReactTable';

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

function ReactTable({ columns, data }) {
  const theme = useTheme();
  const filterTypes = useMemo(() => renderFilterTypes, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { selectedRowIds },
    selectedFlatRows
  } = useTable(
    {
      columns,
      data,
      filterTypes,
      initialState: { pageIndex: 0, pageSize: 100, selectedRowIds: {} }
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

  // eslint-disable-next-line no-unused-vars
  const sRows = () => {
    JSON.stringify(
      {
        selectedRowIndices: selectedRowIds,
        'selectedFlatRows[].original': selectedFlatRows.map((d) => d.original)
      },
      null,
      2
    );
  };

  return (
    <>
      <MainCard title="CHARGING - Please sight return paperwork before verifying" content={false} secondary={<VerifyUpdatesButton />}>
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
                      sx={{ cursor: 'pointer', bgcolor: row.isSelected ? alpha(theme.palette.primary.lighter, 0.35) : 'inherit' }}
                    >
                      {row.cells.map((cell, index) => (
                        <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                          {cell.render('Cell')}
                        </TableCell>
                      ))}
                    </TableRow>
                  );
                })}
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
  striped: PropTypes.bool
};

// ==============================|| REACT TABLE - BASIC ||============================== //

const ProdLevelUpdatesCharging = ({ data, striped, title }) => {
  const columns = useMemo(
    () => [
      {
        Header: 'Shift',
        accessor: 'shkey'
      },
      {
        Header: 'Location',
        accessor: 'source_description'
      },
      {
        Header: 'Status',
        accessor: 'status_description',
        className: ''
      },
      {
        Header: 'Measure',
        accessor: 'meascode',
        className: ''
      },
      {
        Header: 'Value',
        accessor: 'measvalue',
        className: '',
        Cell: ({ value }) => parseFloat(value).toFixed(0)
      },
      {
        Header: 'Operator',
        accessor: 'operator_description'
      },
      {
        Header: 'Ring(s)',
        accessor: 'rings'
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

ProdLevelUpdatesCharging.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string
};

export default ProdLevelUpdatesCharging;
