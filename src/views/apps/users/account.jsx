'use client';
import PropTypes from 'prop-types';

import { useEffect, useState } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';

// project import
import MainCard from 'components/MainCard';
import Breadcrumbs from 'components/@extended/Breadcrumbs';
import TabProfile from 'sections/apps/users/TabProfile';
import TabHistory from 'sections/apps/users/TabHistory';
import TabPassword from 'sections/apps/users/TabPassword';
import TabSettings from 'sections/apps/users/TabSettings';

import { APP_DEFAULT_PATH } from 'config';
import { handlerActiveItem, useGetMenuMaster } from 'api/menu';

// assets
import ContainerOutlined from '@ant-design/icons/ContainerOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import TeamOutlined from '@ant-design/icons/TeamOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// ==============================|| PROFILE - ACCOUNT ||============================== //

export default function AccountProfile({ tab }) {
  const router = useRouter();
  const { menuMaster } = useGetMenuMaster();
  const openedItem = menuMaster.openedItem;

  const [value, setValue] = useState(tab);

  const handleChange = (event, newValue) => {
    setValue(newValue);
    router.replace(`/apps/users/account/${newValue}`);
  };

  let breadcrumbTitle = '';
  let breadcrumbHeading = '';

  switch (tab) {
    case 'password':
      breadcrumbTitle = 'Change Password';
      //breadcrumbHeading = 'Change Password';
      break;
    case 'history':
      breadcrumbTitle = 'Activity History';
      //breadcrumbHeading = 'History';
      break;
    case 'settings':
      breadcrumbTitle = 'Preference Settings';
      //breadcrumbHeading = 'Preference Settings';
      break;
    case 'profile':
    default:
      breadcrumbTitle = 'Edit Profile';
    //breadcrumbHeading = 'Profile';
  }

  let breadcrumbLinks = [
    { title: 'Home', to: APP_DEFAULT_PATH },
    { title: 'Account', to: '/apps/users/account/profile' },
    { title: breadcrumbTitle }
  ];
  if (tab === 'basic') {
    breadcrumbLinks = [{ title: 'Home', to: APP_DEFAULT_PATH }, { title: 'Account Profile' }];
  }

  useEffect(() => {
    if (openedItem !== 'account-profile') handlerActiveItem('account-profile');
  }, [openedItem]);

  return (
    <>
      <Breadcrumbs custom heading={breadcrumbHeading} links={breadcrumbLinks} />
      <MainCard border={false} boxShadow>
        <Box sx={{ borderBottom: 1, borderColor: 'divider', width: '100%' }}>
          <Tabs value={value} onChange={handleChange} variant="scrollable" scrollButtons="auto" aria-label="account profile tab">
            <Tab label="Edit Profile" icon={<UserOutlined />} value="profile" iconPosition="start" />
            <Tab label="Change Password" icon={<LockOutlined />} value="password" iconPosition="start" />
            <Tab label="Preference Settings" icon={<SettingOutlined />} value="settings" iconPosition="start" />
            <Tab label="Activity History" icon={<UnorderedListOutlined />} value="history" iconPosition="start" />
          </Tabs>
        </Box>
        <Box sx={{ mt: 2.5 }}>
          {tab === 'profile' && <TabProfile />}
          {tab === 'password' && <TabPassword />}
          {tab === 'settings' && <TabSettings />}
          {tab === 'history' && <TabHistory />}
        </Box>
      </MainCard>
    </>
  );
}

AccountProfile.propTypes = { tab: PropTypes.string };
