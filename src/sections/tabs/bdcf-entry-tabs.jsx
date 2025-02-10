'use client';
import PropTypes from 'prop-types';

import { useState } from 'react';

// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import PatternOutlinedIcon from '@mui/icons-material/PatternOutlined';
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';

// project import
import MainCard from 'components/MainCard';
import BDCFEntryBogTab from './bdcf-entry-bog';
import BDCFEntryDrillTab from './bdcf-entry-drill';
import BDCFEntryChargeTab from './bdcf-entry-charge';
import BDCFEntryFireTab from './bdcf-entry-fire';
import BDCFEntryGroupTab from './bdcf-entry-group1';

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
            <Tab label="Bog" icon={<FactoryOutlinedIcon />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Drill" icon={<GrainOutlinedIcon />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Charge" icon={<PatternOutlinedIcon />} iconPosition="start" {...a11yProps(2)} />
            <Tab label="Fire" icon={<FlareOutlinedIcon />} iconPosition="start" {...a11yProps(3)} />
            <Tab label="Groups" icon={<AccountTreeOutlinedIcon />} iconPosition="start" {...a11yProps(4)} />
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
        <TabPanel value={value} index={4}>
          <BDCFEntryGroupTab />
        </TabPanel>
      </Box>
    </MainCard>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
