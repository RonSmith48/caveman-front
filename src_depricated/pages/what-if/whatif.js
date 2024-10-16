import { Grid, Typography } from '@mui/material';
import WhatIfImage from '../../assets/images/component/whatif.jpg'; // Import the image

const WhatIfPage = () => {
  return (
    <Grid container justifyContent="center" alignItems="center" rowSpacing={4.5} columnSpacing={2.75}>
      <Grid item xs={12} md={6} lg={5} textAlign="center">
        <img src={WhatIfImage} alt="What If" style={{ maxWidth: '100%', maxHeight: '100%' }} /> {/* Display the image */}
        <Typography variant="h2" component="h2">
          Serious Scientific Answers to Absurd Hypothetical Questions
        </Typography>{' '}
        {/* Display the text */}
      </Grid>
    </Grid>
  );
};

export default WhatIfPage;
