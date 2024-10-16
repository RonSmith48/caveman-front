// Author: Ron Smith (with the help of ChatGPT)
// Date: 23 Mar 2023

// USAGE:
// eg.

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from '@mui/material';

const VerifyUpdatesButton = () => {
  const handleClicked = () => {
    console.log('Verify button clicked');
  };
  return (
    <Button variant="outlined" disabled={false} onClick={handleClicked}>
      Verify Selected
    </Button>
  );
};

VerifyUpdatesButton.propTypes = {
  onClick: PropTypes.func
};

export default VerifyUpdatesButton;
