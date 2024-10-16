import React from 'react';
// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';

const DevelopmentPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard title="On this page">
          <div>
            <ul>
              <li>Development</li>
            </ul>
          </div>
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DevelopmentPage;
