import * as React from 'react';
import PropTypes from 'prop-types';

// material-ui
import { Box, Tab, Tabs, Typography } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import VerifyProdDrillingTable from 'components/tables/VerifyProdDrillingTable';
import VerifyProdChargingTable from 'components/tables/VerifyProdChargingTable';
import VerifyProdFiringTable from 'components/tables/VerifyProdFiringTable';

// assets
import { Pattern, FlareOutlined } from '@mui/icons-material';
import { DeploymentUnitOutlined } from '@ant-design/icons';

// ==============================|| PROFILE - ACCOUNT ||============================== //

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

export default function VerifyDCF() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <MainCard border={false} boxShadow>
      <Box sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 0, borderColor: 'divider' }}>
          <Tabs value={value} onChange={handleChange} aria-label="dcf">
            <Tab label="Drilling" icon={<DeploymentUnitOutlined />} iconPosition="start" {...a11yProps(0)} />
            <Tab label="Charging" icon={<Pattern />} iconPosition="start" {...a11yProps(1)} />
            <Tab label="Firing" icon={<FlareOutlined />} iconPosition="start" {...a11yProps(2)} />
          </Tabs>
        </Box>
        <TabPanel value={value} index={0}>
          <VerifyProdDrillingTable />
        </TabPanel>
        <TabPanel value={value} index={1}>
          <VerifyProdChargingTable />
        </TabPanel>
        <TabPanel value={value} index={2}>
          <VerifyProdFiringTable />
        </TabPanel>
      </Box>
    </MainCard>
  );
}
