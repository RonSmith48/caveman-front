import React from 'react';
// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

const SurveyPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard title="On this page">
          <div>
            <ul>
              <li>Markups, what is done and what is not</li>
              <li>Current list, urgency</li>
              <li>Schedules - timeline of what is coming up</li>
            </ul>
          </div>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default SurveyPage;
