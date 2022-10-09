// material-ui
import { Grid } from '@mui/material';

// project imports
import MainCard from '../../components/MainCard';
import SingleFileAutoSubmit from '../../components/third-party/dropzone/DupeDropzone';

// ==============================|| PLUGINS - DROPZONE ||============================== //

const DupeUploadPage = () => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={6}>
        <MainCard>
          <SingleFileAutoSubmit />
        </MainCard>
      </Grid>
    </Grid>
  );
};

export default DupeUploadPage;
