import { useOutletContext } from 'react-router';

// material-ui
import {
  Alert,
  AlertTitle,
  Autocomplete,
  Box,
  Button,
  CardHeader,
  Chip,
  CircularProgress,
  Divider,
  FormHelperText,
  Grid,
  InputLabel,
  List,
  ListItem,
  ListItemSecondaryAction,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography
} from '@mui/material';

// third party
import * as Yup from 'yup';
import { Formik } from 'formik';

// project import
import MainCard from 'components/MainCard';
import Avatar from 'components/@extended/Avatar';
import useAuth from 'hooks/useAuth';

// assets
import { CloseOutlined, InfoCircleFilled } from '@ant-design/icons';

// this list also exists in
// pages/dashboard/default.js
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

function useInputRef() {
  return useOutletContext();
}

function safelyParseJSON(jsonString, fallback = []) {
  try {
    return JSON.parse(jsonString);
  } catch (e) {
    // using a catch to find empty array is not nice, but
    // showing that there is an error is stupid.
    return fallback;
  }
}

// ==============================|| ACCOUNT PROFILE ||============================== //

const TabProfile = () => {
  const { user, updateProfile } = useAuth();

  const inputRef = useInputRef();

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={5} md={4} xl={3}>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <MainCard>
              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Stack spacing={2.5} alignItems="center">
                    <Avatar sx={{ width: 90, height: 90 }}>{user?.initials}</Avatar>
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
          <Grid item xs={12}>
            <Alert color="info" variant="border" icon={<InfoCircleFilled />}>
              <AlertTitle>Info Regarding Role Selection</AlertTitle>
              <Typography variant="h4">All roles have access to the same information.</Typography>
              <Typography variant="body1">
                <p>The layout and display of information may be different to aid work flow.</p>
                <p>
                  Choosing additional roles will affect the notifications that you will receive. By choosing an additional role, you will be
                  named as a caretaker of that position.
                </p>
                <p>
                  If your role is not in the list, choose Manager. The Manager&apos;s layout is designed to give a general overview while
                  not requesting any actions through notifications.
                </p>
              </Typography>
            </Alert>
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
                    additional_roles: safelyParseJSON(user?.additional_roles),
                    submit: null
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
                      setSubmitting(false);
                      updateProfile(values);
                    } catch (err) {
                      setStatus({ success: false });
                      setErrors({ submit: err.message });
                      setSubmitting(false);
                    }
                  }}
                >
                  {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, setFieldValue, touched, values }) => (
                    <form noValidate onSubmit={handleSubmit}>
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
                                inputRef={inputRef}
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

                      <CardHeader title="Additional Role(s)" />
                      <Divider />
                      <Box sx={{ display: 'flex', flexWrap: 'wrap', listStyle: 'none', p: 2.5, m: 0 }} component="ul">
                        <Autocomplete
                          multiple
                          fullWidth
                          id="tags-outlined"
                          options={roles}
                          value={values.additional_roles ?? []}
                          onBlur={handleBlur}
                          getOptionLabel={(label) => label}
                          onChange={(event, newValue) => {
                            setFieldValue('additional_roles', newValue);
                          }}
                          renderInput={(params) => <TextField {...params} name="additional_roles" placeholder="Add Role" />}
                          renderTags={(value, getTagProps) =>
                            value.map((option, index) => (
                              <Chip
                                key={index}
                                {...getTagProps({ index })}
                                variant="combined"
                                label={option}
                                deleteIcon={<CloseOutlined style={{ fontSize: '0.75rem' }} />}
                                sx={{ color: 'text.primary' }}
                              />
                            ))
                          }
                          sx={{
                            '& .MuiOutlinedInput-root': {
                              p: 0,
                              '& .MuiAutocomplete-tag': {
                                m: 1
                              },
                              '& fieldset': {
                                display: 'none'
                              },
                              '& .MuiAutocomplete-endAdornment': {
                                display: 'none'
                              },
                              '& .MuiAutocomplete-popupIndicator': {
                                display: 'none'
                              }
                            }
                          }}
                        />
                      </Box>
                      <Box sx={{ p: 2.5 }}>
                        <Stack direction="row" justifyContent="flex-end" alignItems="center" spacing={2} sx={{ mt: 2.5 }}>
                          <Button variant="outlined" color="secondary">
                            Cancel
                          </Button>
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
};

export default TabProfile;
