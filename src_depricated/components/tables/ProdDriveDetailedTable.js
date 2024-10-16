import PropTypes from 'prop-types';
import React from 'react';

// material-ui
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';

// third-party
import { useTable, useGroupBy, useExpanded } from 'react-table';

// project-import
import MainCard from 'components/MainCard';
import ScrollX from 'components/ScrollX';

// assets
import { DownOutlined, GroupOutlined, RightOutlined, UngroupOutlined } from '@ant-design/icons';

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data }) {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } = useTable(
    {
      columns,
      data,
      // @ts-ignore
      initialState: { groupBy: ['shkey'] }
    },
    useGroupBy,
    useExpanded
  );

  const firstPageRows = rows;

  return (
    <Table {...getTableProps()}>
      <TableHead>
        {headerGroups.map((headerGroup, i) => (
          <TableRow {...headerGroup.getHeaderGroupProps()} key={i}>
            {headerGroup.headers.map((column, index) => {
              const groupIcon = column.isGrouped ? <UngroupOutlined /> : <GroupOutlined />;
              return (
                <TableCell key={`group-header-cell-${index}`} {...column.getHeaderProps([{ className: column.className }])}>
                  <Stack direction="row" spacing={1.15} alignItems="center" sx={{ display: 'inline-flex' }}>
                    {column.canGroupBy ? (
                      <Box
                        sx={{ color: column.isGrouped ? 'error.main' : 'primary.main', fontSize: '1rem' }}
                        {...column.getGroupByToggleProps()}
                      >
                        {groupIcon}
                      </Box>
                    ) : null}
                    <Box>{column.render('Header')}</Box>
                  </Stack>
                </TableCell>
              );
            })}
          </TableRow>
        ))}
      </TableHead>
      <TableBody {...getTableBodyProps()}>
        {firstPageRows.map((row, i) => {
          prepareRow(row);
          return (
            <TableRow key={i} {...row.getRowProps()}>
              {row.cells.map((cell, index) => {
                let bgcolor = 'background.paper';
                if (cell.isGrouped) bgcolor = 'success.lighter';
                if (cell.isAggregated) bgcolor = 'warning.lighter';
                if (cell.isPlaceholder) bgcolor = 'error.lighter';

                const collapseIcon = row.isExpanded ? <DownOutlined /> : <RightOutlined />;

                return (
                  <TableCell key={index} {...cell.getCellProps([{ className: cell.column.className }])} sx={{ bgcolor }}>
                    {/* eslint-disable-next-line */}
                    {cell.isGrouped ? (
                      <Stack direction="row" spacing={1} alignItems="center" sx={{ display: 'inline-flex' }}>
                        <Box sx={{ pr: 1.25, fontSize: '0.75rem', color: 'text.secondary' }} {...row.getToggleRowExpandedProps()}>
                          {collapseIcon}
                        </Box>
                        {cell.render('Cell')} ({row.subRows.length})
                      </Stack>
                    ) : // eslint-disable-next-line
                    cell.isAggregated ? (
                      cell.render('Aggregated')
                    ) : cell.isPlaceholder ? null : (
                      cell.render('Cell')
                    )}
                  </TableCell>
                );
              })}
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}

ReactTable.propTypes = {
  columns: PropTypes.array,
  data: PropTypes.array
};

// ==============================|| REACT TABLE - GROUPING TABLE ||============================== //

function ProdDriveDetailedTable({ data }) {
  data = data.results;
  const columns = React.useMemo(
    () => [
      {
        Header: 'Shift',
        accessor: 'shkey'
      },
      {
        Header: 'Event Date/Time',
        accessor: 'eventdatetime',
        disableGroupBy: true
      },
      {
        Header: 'Parent Status',
        accessor: 'status_parentstatus',
        disableGroupBy: true
      },
      {
        Header: 'Status',
        accessor: 'status_description',
        disableGroupBy: true
      },
      {
        Header: 'Equipment',
        accessor: 'equipment_description',
        disableGroupBy: true
      },
      {
        Header: 'Destination',
        accessor: 'destination_description',
        disableGroupBy: true
      },
      {
        Header: 'Measure',
        accessor: 'meascode',
        className: 'cell-right',
        disableGroupBy: true
      },
      {
        Header: 'Value',
        accessor: 'measvalue',
        disableGroupBy: true
      },
      {
        Header: 'Operator',
        accessor: 'operator_description',
        disableGroupBy: true
      }
    ],
    []
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <ReactTable columns={columns} data={data} />
      </ScrollX>
    </MainCard>
  );
}

ProdDriveDetailedTable.propTypes = {
  data: PropTypes.array
};

export default ProdDriveDetailedTable;
