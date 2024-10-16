import PropTypes from 'prop-types';
import { useRef, useState } from 'react';

// next
import { useRouter } from 'next/navigation';

// material-ui
import { useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import ButtonBase from '@mui/material/ButtonBase';
import CardContent from '@mui/material/CardContent';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import Stack from '@mui/material/Stack';
import Tab from '@mui/material/Tab';
import Tabs from '@mui/material/Tabs';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import { SupportOutlined, ManageAccountsOutlined } from '@mui/icons-material';

// project import
import AccountTab from './AccountTab';
import DiscourseTab from './DiscourseTab';
import SvgAvatar from 'components/SvgAvatar';
import MainCard from 'components/MainCard';
import Transitions from 'components/@extended/Transitions';
import IconButton from 'components/@extended/IconButton';

import { ThemeMode } from 'config';
import useUser from 'hooks/useUser';
import { signOut } from 'utils/auth'; // Import your custom signOut function

// assets
import LogoutOutlined from '@ant-design/icons/LogoutOutlined';
import SettingOutlined from '@ant-design/icons/SettingOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';

// tab panel wrapper
function TabPanel({ children, value, index, ...other }) {
  return (
    <div role="tabpanel" hidden={value !== index} id={`profile-tabpanel-${index}`} aria-labelledby={`profile-tab-${index}`} {...other}>
      {value === index && children}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `profile-tab-${index}`,
    'aria-controls': `profile-tabpanel-${index}`
  };
}

// ==============================|| HEADER CONTENT - PROFILE ||============================== //

export default function Profile() {
  const theme = useTheme();
  const { user } = useUser();
  const router = useRouter();
  const SM_AVATAR_SIZE = 32;
  const LG_AVATAR_SIZE = 52;
  const DEFAULT_AVATAR_BGCOLOUR = '#F5F5F5';

  const handleLogout = () => {
    signOut();
    router.push('/login');
  };

  const anchorRef = useRef(null);
  const [open, setOpen] = useState(false);
  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    setOpen(false);
  };

  const [value, setValue] = useState(0);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const iconBackColorOpen = theme.palette.mode === ThemeMode.DARK ? 'background.default' : 'grey.100';

  return (
    <Box sx={{ flexShrink: 0, ml: 0.75 }}>
      <ButtonBase
        sx={{
          p: 0.25,
          bgcolor: open ? iconBackColorOpen : 'transparent',
          borderRadius: 1,
          '&:hover': { bgcolor: theme.palette.mode === ThemeMode.DARK ? 'secondary.light' : 'secondary.lighter' },
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.secondary.dark}`,
            outlineOffset: 2
          }
        }}
        aria-label="open profile"
        ref={anchorRef}
        aria-controls={open ? 'profile-grow' : undefined}
        aria-haspopup="true"
        onClick={handleToggle}
      >
        {user && (
          <Stack direction="row" spacing={1.25} alignItems="center" sx={{ p: 0.5 }}>
            <div
              style={{
                width: SM_AVATAR_SIZE,
                height: SM_AVATAR_SIZE,
                backgroundColor: user?.bg_colour ? user.bg_colour : DEFAULT_AVATAR_BGCOLOUR,
                borderRadius: '50%', // Makes the background a circle
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                overflow: 'hidden' // Ensures the avatar stays inside the circle
              }}
            >
              <SvgAvatar src={user?.avatar} alt={user?.full_name} size={SM_AVATAR_SIZE} />
            </div>
            <Typography variant="subtitle1" sx={{ textTransform: 'capitalize' }}>
              {user.full_name}
            </Typography>
          </Stack>
        )}
      </ButtonBase>
      <Popper
        placement="bottom-end"
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        popperOptions={{
          modifiers: [
            {
              name: 'offset',
              options: {
                offset: [0, 9]
              }
            }
          ]
        }}
      >
        {({ TransitionProps }) => (
          <Transitions type="fade" in={open} {...TransitionProps}>
            <Paper
              sx={{
                boxShadow: theme.customShadows.z1,
                width: 290,
                minWidth: 240,
                maxWidth: { xs: 250, md: 290 }
              }}
            >
              <ClickAwayListener onClickAway={handleClose}>
                <MainCard elevation={0} border={false} content={false}>
                  <CardContent sx={{ px: 2.5, pt: 3 }}>
                    <Grid container justifyContent="space-between" alignItems="center">
                      <Grid item>
                        {user && (
                          <Stack direction="row" spacing={1.25} alignItems="center">
                            <div
                              style={{
                                width: LG_AVATAR_SIZE,
                                height: LG_AVATAR_SIZE,
                                backgroundColor: user?.bg_colour ? user.bg_colour : DEFAULT_AVATAR_BGCOLOUR,
                                borderRadius: '50%', // Makes the background a circle
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                overflow: 'hidden' // Ensures the avatar stays inside the circle
                              }}
                            >
                              <SvgAvatar src={user?.avatar} alt={user?.full_name} size={LG_AVATAR_SIZE} />
                            </div>
                            <Stack>
                              <Typography variant="h6">{user.full_name}</Typography>
                              <Typography variant="body2" color="text.secondary">
                                {user.role}
                              </Typography>
                            </Stack>
                          </Stack>
                        )}
                      </Grid>
                      <Grid item>
                        <Tooltip title="Logout">
                          <IconButton size="large" sx={{ color: 'text.primary' }} onClick={handleLogout}>
                            <LogoutOutlined />
                          </IconButton>
                        </Tooltip>
                      </Grid>
                    </Grid>
                  </CardContent>
                  {open && (
                    <>
                      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                        <Tabs variant="fullWidth" value={value} onChange={handleChange} aria-label="profile tabs">
                          <Tab
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textTransform: 'capitalize'
                            }}
                            icon={<ManageAccountsOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                            label="Account"
                            {...a11yProps(0)}
                          />
                          <Tab
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              justifyContent: 'center',
                              alignItems: 'center',
                              textTransform: 'capitalize'
                            }}
                            icon={<SupportOutlined style={{ marginBottom: 0, marginRight: '10px' }} />}
                            label="Discourse"
                            {...a11yProps(1)}
                          />
                        </Tabs>
                      </Box>
                      <TabPanel value={value} index={0} dir={theme.direction}>
                        <AccountTab handleLogout={handleLogout} handleClose={handleClose} />
                      </TabPanel>
                      <TabPanel value={value} index={1} dir={theme.direction}>
                        <DiscourseTab handleClose={handleClose} />
                      </TabPanel>
                    </>
                  )}
                </MainCard>
              </ClickAwayListener>
            </Paper>
          </Transitions>
        )}
      </Popper>
    </Box>
  );
}

TabPanel.propTypes = { children: PropTypes.node, value: PropTypes.number, index: PropTypes.number, other: PropTypes.any };
