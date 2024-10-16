'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project import
import MainCard from 'components/MainCard';
import BDCFEntryBogTab from './bdcf-entry-bog';
import BDCFEntryDrillTab from './bdcf-entry-drill';
import BDCFEntryChargeTab from './bdcf-entry-charge';
import BDCFEntryFireTab from './bdcf-entry-fire';

// assets
import BookOutlined from '@ant-design/icons/BookOutlined';
import FileImageOutlined from '@ant-design/icons/FileImageOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import UsergroupAddOutlined from '@ant-design/icons/UsergroupAddOutlined';

function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ pt: 2 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
}

// ==============================|| TABS - ICON ||============================== //

export default function BDCFTabs() {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="basic tabs example">
            <Tab label="Bog" icon={<UserOutlined />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Drill" icon={<BookOutlined />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Charge" icon={<UsergroupAddOutlined />} iconPosition="start" {...a11yProps(2)} />
            <Tab label="Fire" icon={<FileImageOutlined />} iconPosition="start" {...a11yProps(3)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <BDCFEntryBogTab />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <BDCFEntryDrillTab />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <BDCFEntryChargeTab />
        </TabPanel>
        <TabPanel value={value} index={3}>
          <BDCFEntryFireTab />
        </TabPanel>
      </Box>
    </MainCard>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
