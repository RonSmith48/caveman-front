import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import Timeline from '@mui/lab/Timeline';
import TimelineItem from '@mui/lab/TimelineItem';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineOppositeContent from '@mui/lab/TimelineOppositeContent';
import TimelineDot from '@mui/lab/TimelineDot';
import ArchitectureIcon from '@mui/icons-material/Architecture';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import PatternIcon from '@mui/icons-material/Pattern';
import FlareIcon from '@mui/icons-material/Flare';
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { Tooltip } from '@mui/material/index';
import { fetcher } from 'utils/axios';

export default function LocationTimeline({ location_id }) {
  const [timelineData, setTimelineData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTimelineData = async () => {
      try {
        const response = await fetcher(`/prod-actual/history/${location_id}/`);

        setTimelineData(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching timeline data:', error);
        setTimelineData([]);
      } finally {
        setLoading(false);
      }
    };

    if (location_id) {
      fetchTimelineData();
    }
  }, [location_id]);

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
        <CircularProgress />
      </Box>
    );
  }

  /*   if (timelineData.length === 0) {
    return (
      <Typography variant="h6" align="center" color="text.secondary">
        No timeline data available.
      </Typography>
    );
  } */
  return (
    <Box>
      <Typography variant="h4" component="h2" sx={{ mb: 2, textAlign: 'center' }}>
        Mock Timeline
      </Typography>
      <Timeline>
        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
            11 Jan 2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="primary" variant="outlined">
              <ArchitectureIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '22px', px: 2 }}>
            <Tooltip title="Ron Smith" arrow>
              <Typography variant="h5" component="span" sx={{ cursor: 'pointer' }}>
                Designed
              </Typography>
            </Tooltip>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} variant="body2" color="text.secondary">
            12 Jan 2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="warning" variant="outlined">
              <GrainOutlinedIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '22px', px: 2 }}>
            <Typography variant="h5" component="span">
              Drilled
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
            13 Jan 2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h6" component="span">
              Blocked holes
            </Typography>
            <Typography>Right shoulder holes G & H</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
            14 Jan 2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot />
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '22px', px: 2 }}>
            <Typography variant="h6" component="span">
              Cleanouts
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineSeparator>
            <TimelineConnector />
            <TimelineDot color="success" variant="outlined">
              <PatternIcon />
            </TimelineDot>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '12px', px: 2 }}>
            <Typography variant="h5" component="span">
              Charged
            </Typography>
            <Typography>Webgen</Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
            15 Jan 2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot color="error" variant="outlined">
              <FlareIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '22px', px: 2 }}>
            <Typography variant="h5" component="span">
              Fired
            </Typography>
          </TimelineContent>
        </TimelineItem>

        <TimelineItem>
          <TimelineOppositeContent sx={{ m: 'auto 0' }} align="right" variant="body2" color="text.secondary">
            16 Jan 2025
          </TimelineOppositeContent>
          <TimelineSeparator>
            <TimelineConnector sx={{ bgcolor: 'secondary.main' }} />
            <TimelineDot color="secondary" variant="outlined">
              <CloseOutlinedIcon />
            </TimelineDot>
            <TimelineConnector />
          </TimelineSeparator>
          <TimelineContent sx={{ py: '22px', px: 2 }}>
            <Typography variant="h5" component="span">
              Abandoned
            </Typography>
          </TimelineContent>
        </TimelineItem>
      </Timeline>
    </Box>
  );
}
