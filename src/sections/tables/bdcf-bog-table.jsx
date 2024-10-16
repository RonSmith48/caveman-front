'use client';
import PropTypes from 'prop-types';

import { useMemo, useState, useEffect } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';

import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined';

// third-party
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';

// project-import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import CSVExport from 'components/third-party/react-table/CSVExport';
import RowEditable from 'components/third-party/react-table/RowEditable';
import { fetcher } from 'utils/axios';

// assets
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EditTwoTone from '@ant-design/icons/EditTwoTone';
import SendOutlined from '@ant-design/icons/SendOutlined';

function EditAction({ row, table }) {
  const meta = table?.options?.meta;
  const setSelectedRow = (e) => {
    meta?.setSelectedRow((old) => ({
      ...old,
      [row.id]: !old[row.id]
    }));

    // @ts-ignore
    meta?.revertData(row.index, e?.currentTarget.name === 'cancel');
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {meta?.selectedRow[row.id] && (
        <Tooltip title="Cancel">
          <IconButton color="error" name="cancel" onClick={setSelectedRow}>
            <CloseOutlined />
          </IconButton>
        </Tooltip>
      )}
      <Tooltip title={meta?.selectedRow[row.id] ? 'Save' : 'Edit'}>
        <IconButton color={meta?.selectedRow[row.id] ? 'success' : 'primary'} onClick={setSelectedRow}>
          {meta?.selectedRow[row.id] ? <SendOutlined /> : <EditTwoTone />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, setData }) {
  const [originalData, setOriginalData] = useState(() => [...data]);
  const [selectedRow, setSelectedRow] = useState({});

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      cell: RowEditable
    },
    getCoreRowModel: getCoreRowModel(),
    meta: {
      selectedRow,
      setSelectedRow,
      revertData: (rowIndex, revert) => {
        if (revert) {
          setData((old) => old.map((row, index) => (index === rowIndex ? originalData[rowIndex] : row)));
        } else {
          setOriginalData((old) => old.map((row, index) => (index === rowIndex ? data[rowIndex] : row)));
        }
      },
      updateData: (rowIndex, columnId, value) => {
        setData((old) =>
          old.map((row, index) => {
            if (index === rowIndex) {
              return {
                ...old[rowIndex],
                [columnId]: value
              };
            }
            return row;
          })
        );
      }
    },
    debugTable: true
  });

  let headers = [];
  table.getAllColumns().map(
    (columns) =>
      columns.columnDef.accessorKey &&
      headers.push({
        label: typeof columns.columnDef.header === 'string' ? columns.columnDef.header : '#',
        key: columns.columnDef.accessorKey
      })
  );

  return (
    <MainCard content={false}>
      <ScrollX>
        <TableContainer>
          <Table>
            <TableHead>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableCell key={header.id} {...header.column.columnDef.meta}>
                      {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableHead>
            <TableBody>
              {table.getRowModel().rows.map((row) => (
                <TableRow key={row.id}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} {...cell.column.columnDef.meta}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </ScrollX>
    </MainCard>
  );
}

// ==============================|| REACT TABLE - EDITABLE ROW ||============================== //

export default function BDCFBogTable({ location_id, ringName }) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBoggingEntries = async () => {
      if (!location_id) return; // Skip fetch if location_id is not available
      setLoading(true);
      try {
        const response = await fetcher(`/prod-actual/bdcf/bog/${location_id}`);
        console.log(response); //=========
        setData(response);
      } catch (error) {
        console.error('Error fetching active rings list:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBoggingEntries();
  }, [location_id]);

  // Memoize columns outside of any conditional statement
  const columns = useMemo(
    () => [
      {
        header: 'Date',
        accessorKey: 'date',
        dataType: 'text'
      },
      {
        header: 'Tonnes',
        accessorKey: 'tonnes',
        dataType: 'text',
        meta: {
          className: 'cell-right'
        }
      },
      {
        header: 'Entered (timestamp)',
        accessorKey: 'timestamp',
        dataType: 'text',
        cell: ({ row }) => {
          const date = new Date(row.original.timestamp);
          return new Intl.DateTimeFormat('en-GB', {
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
          }).format(date);
        }
      },
      {
        header: 'Contributor',
        accessorKey: 'user',
        dataType: 'text',
        cell: ({ row }) => {
          const user = row.original.user;
          return user ? (
            <Tooltip title={user.full_name}>
              <div>
                <Image
                  src={`/assets/images/users/${user.avatar}`}
                  alt={user.full_name}
                  width={30}
                  height={30}
                  style={{ borderRadius: '50%' }}
                />
              </div>
            </Tooltip>
          ) : (
            <Tooltip title="Legacy PMD">
              <div>
                <AssistWalkerOutlinedIcon fontSize="large" />
              </div>
            </Tooltip>
          );
        },
        meta: {
          className: 'cell-center'
        }
      },
      {
        header: 'Actions',
        id: 'edit',
        cell: EditAction,
        meta: {
          className: 'cell-center'
        }
      }
    ],
    [] // Ensure this dependency array remains empty for stable columns
  );

  // Ensure consistent render order by checking loading status outside of the main return
  if (loading) return <p>Loading...</p>;

  return (
    <div>
      <MainCard sx={{ mb: 2 }} content={false}>
        <CardContent>
          <Typography variant="h5">{ringName}</Typography>
          <Typography variant="body1" sx={{ textAlign: 'right' }}>
            Adding stats here.
          </Typography>
        </CardContent>
      </MainCard>

      {/* Table */}
      <Box sx={{ mt: 2 }}>
        <ReactTable {...{ data, columns, setData }} />
      </Box>
    </div>
  );
}

EditAction.propTypes = { row: PropTypes.object, table: PropTypes.object };
ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, setData: PropTypes.any };
