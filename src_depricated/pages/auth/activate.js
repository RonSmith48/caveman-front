// material-ui
import { Grid, Stack, Typography } from '@mui/material';

// project import
import AuthWrapper from 'sections/auth/AuthWrapper';
import AuthActivate from 'sections/auth/auth-forms/AuthActivate';

// ================================|| CODE VERIFICATION ||================================ //

const CodeVerification = () => {
  let email = '';
  if (window.sessionStorage.getItem('users') !== undefined && window.sessionStorage.getItem('users') !== null) {
    // may be more than one user
    const localUsers = JSON.parse(window.sessionStorage.getItem('users'));
    if (localUsers.length && localUsers.length > 1) {
      const latestUser = localUsers[localUsers.length - 1];
      email = JSON.parse(JSON.stringify(latestUser)).email;
    } else {
      email = JSON.parse(JSON.stringify(localUsers)).email;
    }
  }
  return (
    <AuthWrapper>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Stack spacing={1}>
            <Typography variant="h3">Enter Verification Code</Typography>
            <Typography color="secondary">We sent you an email to verify your identity.</Typography>
            <Typography color="secondary">Your 4-digit OTP (One-Time Password) was sent to:</Typography>
          </Stack>
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h5" sx={{ textAlign: 'center' }}>
            {email}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <AuthActivate email={email} />
        </Grid>
      </Grid>
    </AuthWrapper>
  );
};

export default CodeVerification;
