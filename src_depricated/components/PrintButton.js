// Author: Ron Smith (with the help of ChatGPT)
// Date: 27 Feb 2023

// USAGE: <PrintButton printable="report-content" />
// eg. <div id="report-content"> encompass the printable area.

import React from 'react';
import PropTypes from 'prop-types';
//import printJS from 'print-js';
import { IconButton, Tooltip } from '@mui/material';
import { PrinterTwoTone } from '@ant-design/icons';

const PrintButton = ({ printable }) => {
  const handlePrint = () => {
    //printJS(printable, 'html');
    console.log(printable);
    window.print();
  };
  return (
    <Tooltip title="Print" placement="top">
      <IconButton
        color="primary"
        aria-label="print this"
        component="label"
        style={{ verticalAlign: 'bottom', paddingBottom: '0.75rem' }}
        onClick={handlePrint}
      >
        <PrinterTwoTone style={{ fontSize: '1.5rem', color: 'inherit' }} />
      </IconButton>
    </Tooltip>
  );
};

PrintButton.propTypes = {
  onClick: PropTypes.func.isRequired
};

export default PrintButton;
