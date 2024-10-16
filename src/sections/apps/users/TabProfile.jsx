'use client';

import React, { useState } from 'react';
import useUser from 'hooks/useUser';

// material-ui
import {
  Box,
  Button,
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormHelperText,
  Grid,
  IconButton,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  Select,
  Stack,
  TextField,
  Tooltip,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import MainCard from 'components/MainCard';
import AvatarSelectionModal from './AvatarSelectionModal';
import SvgAvatar from 'components/SvgAvatar';
import { updateUser } from 'utils/auth';
import { DEFAULT_AVATAR_BGCOLOUR } from 'config';
import { enqueueSnackbar } from 'notistack';

const roles = [
  'Manager',
  'Mine Captain',
  'Production Shiftboss',
  'Development Shiftboss',
  'Operations Shiftboss',
  'Production Engineer',
  'Development Engineer',
  'Geotechnical Engineer',
  'Electrical Engineer',
  'Mechanical Engineer',
  'Geologist',
  'Surveyor',
  'Mobile Maint Planner',
  'Pitram Operator'
];

// ==============================|| ACCOUNT PROFILE - BASIC ||============================== //

export default function TabProfile() {
  const { user } = useUser();
  const [isSubmitting, setSubmitting] = useState(false);
  const [avatarModalOpen, setAvatarModalOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(user?.avatar || 'default.svg');
  const AVATAR_SIZE = 150;

  const updateProfile = async (values) => {
    try {
      await updateUser(values);
    } catch (error) {
      console.error('Error updating profile:', error);
      throw new Error('Failed to update profile');
    }
  };

  const handleAvatarClick = () => {
    setAvatarModalOpen(true); // Open modal when avatar is clicked
  };

  const handleAvatarSelect = (avatar) => {
    setSelectedAvatar(avatar); // Update the selected avatar
    setAvatarModalOpen(false); // Close modal after selection
  };

  const handleSave = () => {
    // Save selected avatar (you might call your API here)
    console.log('Avatar saved:', selectedAvatar);
  };

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    <div
                      style={{
                        width: AVATAR_SIZE,
                        height: AVATAR_SIZE,
                        backgroundColor: user?.bg_colour ? user.bg_colour : DEFAULT_AVATAR_BGCOLOUR,
                        borderRadius: '50%', // Makes the background a circle
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        overflow: 'hidden' // Ensures the avatar stays inside the circle
                      }}
                    >
                      <Tooltip title="Choose avatar" arrow>
                        <IconButton onClick={handleAvatarClick} sx={{ padding: 10 }}>
                          <SvgAvatar src={selectedAvatar} alt={user?.full_name} size={AVATAR_SIZE} />
                        </IconButton>
                      </Tooltip>
                    </div>
                    <Stack spacing={0.5} alignItems="center">
                      <Typography variant="h5">{user?.full_name}</Typography>
                      <Typography color="secondary">{user?.role}</Typography>
                    </Stack>
                  </Stack>
                </Grid>
                <Grid item xs={12}>
                  <Divider />
                </Grid>
                <Grid item xs={12}>
                  <List component="nav" aria-label="main mailbox folders" sx={{ py: 0, '& .MuiListItem-root': { p: 0, py: 1 } }}>
                    <ListItem>
                      <Typography align="right">Email:</Typography>
                      <ListItemSecondaryAction>
                        <Typography align="right">{user?.email}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <ListItem>
                      <Typography align="right">Signup Date:</Typography>
                      <ListItemSecondaryAction>
                        <Typography align="right">{new Date(user?.start_date).toLocaleDateString('en-GB')}</Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                    <br />
                    <ListItem>
                      <Typography align="right">Last Login:</Typography>
                      <ListItemSecondaryAction>
                        <Typography align="right">
                          {new Date(user?.last_login).toLocaleDateString('en-GB')} <br />
                          {new Date(user?.last_login).toLocaleTimeString('en-US', { hour12: true })}
                        </Typography>
                      </ListItemSecondaryAction>
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12} sm={7} md={8} xl={9}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard content={false} title="Personal Information" sx={{ '& .MuiInputLabel-root': { fontSize: '0.875rem' } }}>
              {user ? (
                <Formik
                  initialValues={{
                    first_name: user?.first_name || '',
                    last_name: user?.last_name || '',
                    initials: user?.initials || '',
                    email: user?.email || '',
                    role: user?.role || '',
                    avatar: selectedAvatar
                  }}
                  validationSchema={Yup.object().shape({
                    first_name: Yup.string().max(255).required('First Name is required.'),
                    last_name: Yup.string().max(255).required('Last Name is required.'),
                    initials: Yup.string().max(3).required('Initials are required.'),
                    role: Yup.string().required('Designation is required')
                  })}
                  onSubmit={(values, { setErrors, setStatus, setSubmitting }) => {
                    try {
                      setStatus({ success: true });
                      setSubmitting(true);
                      updateProfile(values);
                      setSubmitting(false);
                    } catch (err) {
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
                      <AvatarSelectionModal
                        isOpen={avatarModalOpen}
                        handleClose={() => setAvatarModalOpen(false)}
                        handleSelect={(avatar) => {
                          setSelectedAvatar(avatar); // Update local avatar state
                          setFieldValue('avatar', avatar); // Update Formik avatar field
                          setAvatarModalOpen(false); // Close modal
                        }}
                      />
                      <Box sx={{ p: 2.5 }}>
                        <Grid container spacing={3}>
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="personal-first-name">First Name</InputLabel>
                              <TextField
                                fullWidth
                                id="personal-first-name"
                                value={values.first_name}
                                name="first_name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="First Name"
                                autoFocus
                                //inputRef={''}
                              />
                              {touched.first_name && errors.first_name && (
                                <FormHelperText error id="personal-first-name-helper">
                                  {errors.first_name}
                                </FormHelperText>
                              )}
                            </Stack>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="personal-last-name">Last Name</InputLabel>
                              <TextField
                                fullWidth
                                id="personal-last-name"
                                value={values.last_name}
                                name="last_name"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Last Name"
                              />
                              {touched.last_name && errors.last_name && (
                                <FormHelperText error id="personal-last-name-helper">
                                  {errors.last_name}
                                </FormHelperText>
                              )}
                            </Stack>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="personal-initials">Initials</InputLabel>
                              <TextField
                                fullWidth
                                id="personal-initials"
                                value={values.initials}
                                name="initials"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Initials"
                              />
                              {touched.initials && errors.initials && (
                                <FormHelperText error id="personal-initials-helper">
                                  {errors.initials}
                                </FormHelperText>
                              )}
                            </Stack>
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Stack spacing={1.25}>
                              <InputLabel htmlFor="personal-designation">Primary Role</InputLabel>
                              <Select
                                fullWidth
                                id="personal-designation"
                                value={values.role}
                                name="role"
                                onBlur={handleBlur}
                                onChange={handleChange}
                                placeholder="Primary Role"
                              >
                                {touched.role && errors.role && (
                                  <FormHelperText error id="personal-designation-helper">
                                    {errors.role}
                                  </FormHelperText>
                                )}
                                {roles.map((i) => (
                                  <MenuItem key={i} value={i}>
                                    {i}
                                  </MenuItem>
                                ))}
                              </Select>
                            </Stack>
                          </Grid>
                        </Grid>
                      </Box>

                      <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                          <Button disabled={isSubmitting || Object.keys(errors).length !== 0} type="submit" variant="contained">
                            Save
                          </Button>
                        </Stack>
                      </Box>
                    </form>
                  )}
                </Formik>
              ) : (
                <CircularProgress />
              )}
            </MainCard>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
