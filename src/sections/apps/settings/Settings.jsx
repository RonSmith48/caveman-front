'use client';

import * as React from 'react';
import PropTypes from 'prop-types';
import { Box, Divider, Tab, Tabs, Typography } from '@mui/material';
import Head from 'next/head';

// Tabs
import DupeUpload from './TabPMD';
import FMUpdateUpload from './TabFMConcept';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

export default function SettingsTabs() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <>
      <Head>
        <title>Settings Tabs</title>
        <meta name="description" content="Settings Tabs page" />
      </Head>

      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
            <Tab label="PMD" {...a11yProps(0)} />
            <Tab label="FM Concept" {...a11yProps(1)} />
            <Tab label="Item Three" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <Typography variant="h5" gutterBottom>
            Production Management Database
          </Typography>
          <DupeUpload />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <FMUpdateUpload />
        </TabPanel>
        <TabPanel value={value} index={2}>
          Item Three
        </TabPanel>
      </Box>
    </>
  );
}
