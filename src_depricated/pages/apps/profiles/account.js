import { useEffect, useState } from 'react';
import { useLocation, Link, Outlet } from 'react-router-dom';

// material-ui
import { Box, Tab, Tabs } from '@mui/material';

// project import
import MainCard from 'components/MainCard';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// assets
import { ContainerOutlined, LockOutlined, SettingOutlined, TeamOutlined, UserOutlined } from '@ant-design/icons';

// ==============================|| PROFILE - ACCOUNT ||============================== //

const AccountProfile = () => {
  const { pathname } = useLocation();
  const { menuMaster } = useGetMenuMaster();

  let selectedTab = 0;
  switch (pathname) {
    case '/account/my-account':
      selectedTab = 1;
      break;
    case '/account/password':
      selectedTab = 2;
      break;
    case '/account/role':
      selectedTab = 3;
      break;
    case '/account/settings':
      selectedTab = 4;
      break;
    case '/account/basic':
    default:
      selectedTab = 0;
  }

  const [value, setValue] = useState(selectedTab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  useEffect(() => {
    if (menuMaster.openedItem !== 'account-profile') handlerActiveItem('account-profile');
    if (pathname === '/apps/profiles/account/basic') {
      setValue(0);
    }
    if (pathname === '/account/profile') {
      setValue(0);
    }
    if (pathname === '/account/password') {
      setValue(2);
    }
    if (pathname === '/account/role') {
      setValue(3);
    }
    // eslint-disable-next-line
  }, [pathname]);

  return (
    <>
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab label="Profile" component={Link} to="/account/profile" icon={<UserOutlined />} iconPosition="start" />
            <Tab label="My Account" component={Link} to="/account/my-account" icon={<ContainerOutlined />} iconPosition="start" />
            <Tab label="Change Password" component={Link} to="/account/password" icon={<LockOutlined />} iconPosition="start" />
            <Tab label="Role" component={Link} to="/account/role" icon={<TeamOutlined />} iconPosition="start" />
            <Tab label="Settings" component={Link} to="/account/settings" icon={<SettingOutlined />} iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          <Outlet />
        </Box>
      </MainCard>
    </>
  );
};

export default AccountProfile;
