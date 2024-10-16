import { Box, Tooltip, Typography, Chip } from '@mui/material';
import TaskAltIcon from '@mui/icons-material/TaskAlt';
import PrintButton from 'components/PrintButton';
import { WarningAmberOutlined } from '@mui/icons-material';

const ReportHeader = ({ title, verifier, verified, reportDate, onPrintReport }) => {
  const verfd = verified;
  const tooltipTitle = verifier ? `${verifier}` : 'Not Verified';

  return (
    <Box display="flex" alignItems="center" justifyContent="space-between" width="100%" p={2}>
      <Box>
        <Typography variant="h3">{title}</Typography>
        <Typography variant="subtitle1">{`Report Date: ${reportDate}`}</Typography>
      </Box>
      <Box display="flex" alignItems="center" justifyContent="flex-end">
        <Box ml={2}>
          {verfd ? (
            <Box display="flex" alignItems="center">
              <Tooltip title={tooltipTitle} placement="top">
                <Chip label="Verified Report" color="success" variant="outlined" icon={<TaskAltIcon />} />
              </Tooltip>
            </Box>
          ) : (
            <Box display="flex" alignItems="center">
              <Chip label="Unverified Report" color="warning" variant="outlined" icon={<WarningAmberOutlined />} />
            </Box>
          )}
        </Box>
        <Box ml={2}>
          <PrintButton printable="report-container" onClick={onPrintReport} />
        </Box>
      </Box>
    </Box>
  );
};

export default ReportHeader;
