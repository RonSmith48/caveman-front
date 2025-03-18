'use client';
import PropTypes from 'prop-types';
import { useState } from 'react';

// material-ui
import { Box, IconButton, Tab, Tabs, Tooltip } from '@mui/material';
import FactoryOutlinedIcon from '@mui/icons-material/FactoryOutlined';
import GrainOutlinedIcon from '@mui/icons-material/GrainOutlined';
import PatternOutlinedIcon from '@mui/icons-material/PatternOutlined';
import FlareOutlinedIcon from '@mui/icons-material/FlareOutlined';
import AccountTreeOutlinedIcon from '@mui/icons-material/AccountTreeOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';

// project import
import MainCard from 'components/MainCard';
import BDCFEntryBogTab from './bdcf-entry-bog';
import BDCFEntryDrillTab from './bdcf-entry-drill';
import BDCFEntryChargeTab from './bdcf-entry-charge';
import BDCFEntryFireTab from './bdcf-entry-fire';
import BDCFEntryGroupTab from './bdcf-entry-group1';

// help dialogs
import BDCFBogHelp from 'components/help-dialog/bdcfBog';
import BDCFChargeHelp from 'components/help-dialog/bdcfCharge';
import BDCFDrillHelp from 'components/help-dialog/bdcfDrill';
import BDCFFireHelp from 'components/help-dialog/bdcfFire';

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

export default function BDCFTabs() {
  const [value, setValue] = useState(0);
  const [openHelp, setOpenHelp] = useState(false);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Function to open the corresponding help dialog
  const handleHelpOpen = () => {
    setOpenHelp(true);
  };

  // Function to close the help dialog
  const handleHelpClose = () => {
    setOpenHelp(false);
  };

  return (
    <>
      <MainCard>
        <Box sx={{ width: '100%' }}>
          {/* Tabs + Help Icon in the Same Row */}
          <Box sx={{ display: 'flex', alignItems: 'center', borderBottom: 1, borderColor: 'divider' }}>
            <Tabs value={value} onChange={handleChange} aria-label="basic tabs example" sx={{ flexGrow: 1 }}>
              <Tab label="Bog" icon={<FactoryOutlinedIcon />} iconPosition="start" {...a11yProps(0)} />
              <Tab label="Drill" icon={<GrainOutlinedIcon />} iconPosition="start" {...a11yProps(1)} />
              <Tab label="Charge" icon={<PatternOutlinedIcon />} iconPosition="start" {...a11yProps(2)} />
              <Tab label="Fire" icon={<FlareOutlinedIcon />} iconPosition="start" {...a11yProps(3)} />
              <Tab label="Groups" icon={<AccountTreeOutlinedIcon />} iconPosition="start" {...a11yProps(4)} />
            </Tabs>

            {/* Help Icon Positioned to the Right, Hidden for "Groups" Tab */}
            {value !== 4 && (
              <Tooltip title="Help">
                <IconButton onClick={handleHelpOpen} size="small">
                  <HelpOutlineOutlinedIcon fontSize="small" />
                </IconButton>
              </Tooltip>
            )}
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

      {/* Conditionally render help dialogs based on the active tab */}
      {value === 0 && <BDCFBogHelp open={openHelp} onClose={handleHelpClose} />}
      {value === 1 && <BDCFDrillHelp open={openHelp} onClose={handleHelpClose} />}
      {value === 2 && <BDCFChargeHelp open={openHelp} onClose={handleHelpClose} />}
      {value === 3 && <BDCFFireHelp open={openHelp} onClose={handleHelpClose} />}
    </>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
