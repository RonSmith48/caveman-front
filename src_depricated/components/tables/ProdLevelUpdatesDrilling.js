import PropTypes from 'prop-types';
import { useCallback, useMemo, Fragment } from 'react';

// material-ui
import { Box, Table, TableBody, TableCell, TableHead, TableRow, Stack } from '@mui/material';

// ant-design
import { DownOutlined, RightOutlined } from '@ant-design/icons';

// third-party
import { useFilters, useTable, useRowSelect, usePagination, useExpanded } from 'react-table';

// project import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';
import VerifyUpdatesButton from 'components/VerifyUpdatesButton';
import ExpandingUserDetail from './ProdLUDExpandingDetail';
//import { renderFilterTypes } from 'utils/react-table';
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

function ReactTable({ columns: userColumns, data, renderRowSubComponent }) {
  //const filterTypes = useMemo(() => renderFilterTypes, []);
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    state: { selectedRowIds },
    selectedFlatRows,
    visibleColumns
  } = useTable(
    {
      columns: userColumns,
      data,
      //filterTypes,
      initialState: { pageIndex: 0, pageSize: 100, selectedRowIds: {} }
    },
    useExpanded,
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
      <MainCard title="DRILLING - Please sight operator plods before verifying" content={false} secondary={<VerifyUpdatesButton />}>
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
                  const rowProps = row.getRowProps();
                  return (
                    <Fragment key={i}>
                      <TableRow {...row.getRowProps()}>
                        {row.cells.map((cell, index) => (
                          <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])}>
                            {cell.render('Cell')}
                          </TableCell>
                        ))}
                      </TableRow>
                      {row.isExpanded && renderRowSubComponent({ row, rowProps, visibleColumns })}
                    </Fragment>
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
  striped: PropTypes.bool,
  renderRowSubComponent: PropTypes.any
};

// ==============================|| REACT TABLE - NOT SO BASIC ||============================== //

const CellExpander = ({ row }) => {
  const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;
  return (
    <Box sx={{ fontSize: '0.75rem', color: 'text.secondary', textAlign: 'center' }} {...row.getToggleRowExpandedProps()}>
      {collapseIcon}
    </Box>
  );
};

CellExpander.propTypes = {
  row: PropTypes.object
};

const ProdLevelUpdatesDrilling = ({ data, title }) => {
  const columns = useMemo(
    () => [
      {
        Header: () => null,
        id: 'expander',
        className: 'cell-center',
        Cell: CellExpander,
        SubCell: () => null
      },
      {
        Header: 'Shift',
        accessor: 'shkey'
      },
      {
        Header: 'Rig',
        accessor: 'equipment_description'
      },
      {
        Header: 'Location',
        accessor: 'source_description',
        className: ''
      },
      {
        Header: 'Parent Status',
        accessor: 'status_parentstatus',
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
        Cell: ({ value }) => parseFloat(value).toFixed(1)
      },
      {
        Header: 'Finished',
        accessor: 'rings'
      }
    ],
    []
  );

  const renderRowSubComponent = useCallback(({ row }) => <ExpandingUserDetail data={data[row.id]} />, [data]);

  return (
    <MainCard content={false} title={title}>
      <ScrollX>
        <ReactTable columns={columns} data={data} renderRowSubComponent={renderRowSubComponent} />
      </ScrollX>
    </MainCard>
  );
};

ProdLevelUpdatesDrilling.propTypes = {
  data: PropTypes.any,
  striped: PropTypes.bool,
  title: PropTypes.string
};

export default ProdLevelUpdatesDrilling;
