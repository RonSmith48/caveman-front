'use client';

import { Box, Card, CardContent, Grid, Button, Typography } from '@mui/material';
import BDCFGenerateReportsCard from 'sections/apps/report/prod-level-status/bdcf-generate-reports-card';
import GeoFiredRingsWidget from 'sections/widget/GeoFiredRingsWidget';
import DCFWidget from 'sections/widget/DCFWidget';

function BDCFEntryReportsTab() {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <BDCFGenerateReportsCard />
      </Grid>
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <DCFWidget />
      </Grid>
      <Grid item xs={12} sm={8} md={6} lg={5}>
        <GeoFiredRingsWidget />
      </Grid>
    </Grid>
  );
}
export default BDCFEntryReportsTab;
