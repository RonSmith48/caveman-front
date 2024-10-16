import PropTypes from 'prop-types';
import React, { useState } from 'react';
import useSWR from 'swr';

// material-ui
import { alpha, useTheme } from '@mui/material/styles';
import {
  Alert,
  AlertTitle,
  Box,
  Chip,
  Collapse,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  LinearProgress,
  Switch,
  InputLabel,
  Typography
} from '@mui/material';

// project imports
import AssignDrillMtrsRings from './AssignDrillMtrsRings';
import MainCard from 'components/MainCard';
import IconButton from 'components/@extended/IconButton';
import { CSVExport } from 'components/third-party/react-table';
import { fetcher } from 'api/axios';

// assets
import { UpOutlined, DownOutlined, BugFilled, WarningFilled, GoldOutlined, ToolOutlined } from '@ant-design/icons';
import { LandslideOutlined } from '@mui/icons-material';

// csv table data
export const header = [
  { label: 'Shift', key: 'name' },
  { label: 'Drill', key: 'calories' },
  { label: 'Location', key: 'fat' },
  { label: 'Status', key: 'carbs' },
  { label: 'Drill Mtrs', key: 'protein' },
  { label: 'Auto Mtrs', key: 'protein' },
  { label: 'Type', key: 'protein' }
];

function Row({ row }) {
  const theme = useTheme();
  const [open, setOpen] = useState(false);
  const [showTimeInformation, setShowTimeInformation] = useState(false);
  const backColor = alpha(theme.palette.primary.lighter, 0.1);

  const renderChip = () => {
    switch (row.interpreted) {
      case 'productive':
        return <Chip color="primary" label="Productive" size="small" variant="light" icon={<GoldOutlined />} />;
      case 'non-productive':
        return <Chip color="secondary" label="Non-Productive" size="small" variant="light" icon={<LandslideOutlined />} />;
      case 'maintenance':
      default:
        return <Chip color="error" label="Maintenance" size="small" variant="light" icon={<ToolOutlined />} />;
    }
  };

  return (
    <>
      <TableRow hover sx={{ '& > *': { borderBottom: 'unset' } }}>
        <TableCell sx={{ pl: 3 }}>
          <IconButton aria-label="expand row" size="small" onClick={() => setOpen(!open)}>
            {open ? <UpOutlined /> : <DownOutlined />}
          </IconButton>
        </TableCell>
        <TableCell component="th" scope="row">
          {row.date}
        </TableCell>
        <TableCell>{row.drill}</TableCell>
        <TableCell>{row.location}</TableCell>
        <TableCell>{renderChip()}</TableCell>
      </TableRow>
      <TableRow sx={{ bgcolor: backColor, '&:hover': { bgcolor: `${backColor} !important` } }}>
        <TableCell sx={{ py: 0 }} colSpan={6}>
          <Collapse in={open} timeout="auto" unmountOnExit>
            {open && (
              <Box sx={{ py: 3, pl: { xs: 3, sm: 5, md: 6, lg: 10, xl: 12 } }}>
                <InputLabel>Show time information</InputLabel>
                <Switch
                  checked={showTimeInformation}
                  onChange={() => setShowTimeInformation(!showTimeInformation)}
                  inputProps={{ 'aria-label': 'Show time information switch' }}
                />

                <TableContainer>
                  <Typography variant="h5">Measures</Typography>
                  <MainCard content={false}>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          <TableCell>Time</TableCell>
                          <TableCell>Parent Status</TableCell>
                          <TableCell>Status</TableCell>
                          <TableCell>Measure Code</TableCell>
                          <TableCell align="right">Value</TableCell>
                          <TableCell>Operator</TableCell>
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {row.measures
                          ?.filter((measureRow) => showTimeInformation || measureRow.meascode !== 'SECONDS')
                          .map((measureRow) => (
                            <TableRow hover key={measureRow.id}>
                              <TableCell component="th" scope="row">
                                {measureRow.event_date_time.substring(10, 16)}
                              </TableCell>
                              <TableCell>{measureRow.parent_status}</TableCell>
                              <TableCell>{measureRow.status}</TableCell>
                              <TableCell>{measureRow.meascode}</TableCell>
                              <TableCell align="right">{measureRow.measvalue}</TableCell>
                              <TableCell>{measureRow.operator_description}</TableCell>
                            </TableRow>
                          ))}
                      </TableBody>
                    </Table>
                  </MainCard>
                  <br />
                  <Alert color="warning" variant="border" icon={<WarningFilled />}>
                    <AlertTitle>Warning</AlertTitle>
                    <Typography variant="h5">
                      You cannot assign meters to production rings before linking Deswik oredrive names to Pitram names.
                    </Typography>
                  </Alert>
                  <MainCard content={false}>
                    <AssignDrillMtrsRings />
                  </MainCard>
                </TableContainer>
              </Box>
            )}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  );
}

Row.propTypes = {
  row: PropTypes.shape({
    name: PropTypes.string,
    calories: PropTypes.number,
    fat: PropTypes.number,
    carbs: PropTypes.number,
    protein: PropTypes.number,
    price: PropTypes.number,
    history: PropTypes.arrayOf(PropTypes.object)
  })
};

// ==============================|| MUI TABLE - COLLAPSIBLE ||============================== //

export default function VerifyProdDrillingTable() {
  const { data, error, isLoading } = useSWR('/api/reports/verify-prod-drill', fetcher);
  if (isLoading) {
    return <LinearProgress />;
  }
  if (error) {
    return (
      <Alert color="error" icon={<BugFilled />}>
        Well, that didn&apos;t work too well
      </Alert>
    );
  }
  return (
    <MainCard
      content={false}
      title="DRILLING - Please sight operator plods before verifying"
      secondary={<CSVExport data={data.data} headers={header} filename={'collapsible-table-data.csv'} />}
    >
      {/* table */}
      <TableContainer>
        <Table aria-label="collapsible table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ pl: 3 }} />
              <TableCell>Shift</TableCell>
              <TableCell>Drill</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Interpreted As</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.data.map((row) => (
              <Row key={row.location} row={row} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </MainCard>
  );
}
