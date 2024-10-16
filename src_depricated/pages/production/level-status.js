import { useEffect, useState } from 'react';

// material-ui
import { Grid } from '@mui/material';

// project import
import axios from 'api/axios';
import BasicTable from 'components/tables/ProdLevelStatusTable';
import ReportHeader from './level-status-header';

// ==============================|| REACT TABLE - BASIC ||============================== //

const baseURL = '/api/reports/prodlevelstatus/';

const Basic = () => {
  const [pls, setPls] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(baseURL);
        const plsJson = response.data.pls;
        setPls(plsJson);
        setLoading(false);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, []);

  const handlePrintReport = () => {
    window.print();
  };

  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <Grid container spacing={3}>
      <div id="report-container" style={{ width: '100%' }}>
        <ReportHeader
          title={`Level Status Report`}
          verifier={pls && pls.full_name}
          verified={pls && pls.verified}
          reportDate={pls && pls.report_date}
          onPrintReport={handlePrintReport}
        />
        {pls &&
          pls.levels.map((level) => (
            <>
              <Grid item xs={12} key={level.level} style={{ marginBottom: '1rem' }}>
                <BasicTable title={`Level: ${level.level}`} data={level.oredrives} />
              </Grid>
            </>
          ))}
      </div>
    </Grid>
  );
};

export default Basic;
