'use client';
import PropTypes from 'prop-types';

import { useMemo, useState, useEffect } from 'react';

// material-ui
import Autocomplete from '@mui/material/Autocomplete';
import Stack from '@mui/material/Stack';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Tooltip from '@mui/material/Tooltip';
import TextField from '@mui/material/TextField';
import Chip from '@mui/material/Chip';

import SupportAgentOutlinedIcon from '@mui/icons-material/SupportAgentOutlined';
import AssistWalkerOutlinedIcon from '@mui/icons-material/AssistWalkerOutlined';

// third-party
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import { enqueueSnackbar } from 'notistack';

// project-import
import ScrollX from 'components/ScrollX';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import CSVExport from 'components/third-party/react-table/CSVExport';
import RowEditable from './bog-RowEditable';
import { fetcher, fetcherPut, fetcherPost } from 'utils/axios';
import SvgAvatar from 'components/SvgAvatar';
import { shkeyToShift } from 'utils/shkey';

// assets
import CloseOutlined from '@ant-design/icons/CloseOutlined';
import EditTwoTone from '@ant-design/icons/EditTwoTone';
import SendOutlined from '@ant-design/icons/SendOutlined';
import DeleteOutlined from '@ant-design/icons/DeleteOutlined';

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

  const handleUncharge = async () => {
    const location_id = row.original.location_id;

    const payload = {
      location_id: location_id,
      charge_shift: '',
      conditions: [], // Clear all conditions
      status: 'Drilled'
    };

    try {
      const response = await fetcherPost('/prod-actual/bdcf/charge/', payload);
      if (response.status === 200) {
        enqueueSnackbar('Ring un-charged successfully', { variant: 'success' });

        if (meta?.handleSelectOredrive) {
          await meta.handleSelectOredrive({ target: { value: meta.currentOredrive } });
        }
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg?.body || 'An unexpected error occurred';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      console.log(error);
    }
  };

  const handleUpdate = async () => {
    const meta = table?.options?.meta;

    if (!meta || !meta.data || !meta.setData) {
      console.error('Meta, data, or setData is not available in handleUpdate');
      return;
    }

    const updatedRow = meta.data.find((rowData) => rowData.location_id === row.original.location_id);

    if (!updatedRow) {
      console.error('Updated row not found in data');
      return;
    }

    const conditions = updatedRow.conditions || []; // Ensure it's a list

    const payload = {
      location_id: updatedRow.location_id,
      shkey: updatedRow.charge_shift,
      conditions: conditions, // Transmit as a list
      status: 'Charged'
    };

    try {
      const response = await fetcherPost('/prod-actual/bdcf/charge/', payload);

      if (response.status === 200) {
        enqueueSnackbar('Row updated successfully', { variant: 'success' });

        if (meta.handleSelectOredrive) {
          await meta.handleSelectOredrive({
            target: { value: meta.currentOredrive }
          });
        }
      } else {
        enqueueSnackbar('Failed to update row', { variant: 'error' });
      }
    } catch (error) {
      const errorMessage = error.response?.data?.msg?.body || 'An unexpected error occurred';
      enqueueSnackbar(errorMessage, { variant: 'error' });
      console.error(error);
    }
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      {meta?.selectedRow[row.id] && (
        <>
          {/* Cancel Button */}
          <Tooltip title="Cancel">
            <IconButton color="primary" name="cancel" onClick={setSelectedRow}>
              <CloseOutlined />
            </IconButton>
          </Tooltip>

          {/* Delete Button (Only visible in edit mode) */}
          <Tooltip title="Un-Charge">
            <IconButton color="error" onClick={handleUncharge}>
              <DeleteOutlined />
            </IconButton>
          </Tooltip>
        </>
      )}

      <Tooltip title={meta?.selectedRow[row.id] ? 'Save' : 'Make Correction'}>
        <IconButton
          color={meta?.selectedRow[row.id] ? 'success' : 'primary'}
          onClick={meta?.selectedRow[row.id] ? handleUpdate : setSelectedRow}
        >
          {meta?.selectedRow[row.id] ? <SendOutlined /> : <EditTwoTone />}
        </IconButton>
      </Tooltip>
    </Stack>
  );
}

// ==============================|| REACT TABLE ||============================== //

function ReactTable({ columns, data, setData, handleSelectOredrive, currentOredrive }) {
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
      data,
      setData,
      handleSelectOredrive,
      currentOredrive,
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

export default function BDCFChargeTable({ oredrive, ringData, handleSelectOredrive }) {
  const [data, setData] = useState(ringData);
  const [loading, setLoading] = useState(true);
  const [conditionsOptions, setConditionsOptions] = useState([]);
  const SM_AVATAR_SIZE = 32;

  useEffect(() => {
    setData(ringData); // Update table data when ringData changes
  }, [ringData]);

  useEffect(() => {
    const fetchConditions = async () => {
      try {
        const response = await fetcher(`/prod-actual/bdcf/conditions/Charged/`);
        console.log(response.data);
        setConditionsOptions(response.data);
      } catch (error) {
        console.error('Failed to fetch conditions:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchConditions();
  }, []);

  // Memoize columns outside of any conditional statement
  const columns = useMemo(
    () => [
      {
        header: 'Completed',
        accessorKey: 'charge_shift', // Key from your data source
        cell: (info) => {
          const value = info.getValue();
          // Format the value using shkeyToShift, or return an empty string if null/undefined
          return value ? shkeyToShift(value) : '';
        }
      },
      {
        header: 'Ring',
        accessorKey: 'ring_number_txt',
        cell: (info) => info.getValue()
      },
      {
        header: 'Detonator',
        accessorKey: 'detonator',
        cell: (info) => info.getValue()
      },
      {
        header: 'Conditions',
        accessorKey: 'conditions',
        cell: (info) => {
          const row = info.row.original;
          const meta = info.table.options.meta;
          const isEditing = meta.selectedRow[info.row.id];

          // Determine currently selected conditions
          const selectedConditions = row.conditions || [];

          if (isEditing) {
            return (
              <Autocomplete
                multiple
                id={`autocomplete-${info.row.id}`}
                options={conditionsOptions} // Array of strings
                value={selectedConditions} // Selected conditions as strings
                onChange={(event, newValue) => {
                  meta.updateData(info.row.index, 'conditions', newValue);
                }}
                renderInput={(params) => <TextField {...params} placeholder="Select Conditions" />}
                sx={{
                  '& .MuiOutlinedInput-root': { p: 1 },
                  '& .MuiAutocomplete-tag': {
                    bgcolor: 'primary.lighter',
                    border: '1px solid',
                    borderColor: 'primary.light',
                    '& .MuiSvgIcon-root': {
                      color: 'primary.main',
                      '&:hover': {
                        color: 'primary.dark'
                      }
                    }
                  }
                }}
              />
            );
          }

          // Render chips for non-editable mode
          return (
            <Stack direction="row" flexWrap="wrap">
              {selectedConditions.map((cond, index) => (
                <Chip key={index} label={`${cond.state}`} variant="outlined" color="primary" size="small" sx={{ margin: '0 4px 4px 0' }} />
              ))}
            </Stack>
          );
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
    [conditionsOptions] // Dependencies for memoization
  );

  if (loading) return <p>Loading...</p>;

  return (
    <MainCard title={oredrive} content={false} secondary={'Charged Rings'}>
      <ReactTable columns={columns} data={data} setData={setData} handleSelectOredrive={handleSelectOredrive} currentOredrive={oredrive} />
    </MainCard>
  );
}

EditAction.propTypes = { row: PropTypes.object, table: PropTypes.object };
ReactTable.propTypes = { columns: PropTypes.array, data: PropTypes.array, setData: PropTypes.any };
