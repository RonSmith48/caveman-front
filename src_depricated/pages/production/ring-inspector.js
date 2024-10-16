import { useState, useEffect } from 'react';
import axios from 'api/axios';
// material-ui
import { Grid, Typography, FormControl, InputLabel, Select, MenuItem, Switch, FormControlLabel, FormGroup } from '@mui/material';

// project imports
import MainCard from 'components/MainCard';
// widgets
import RIWengineeringCard from 'components/cards/RIWengineering';
import RIWgeologyCard from 'components/cards/RIWgeology';
import RIWgeotechnicalCard from 'components/cards/RIWgeotechnical';
import RIWhistoryCard from 'components/cards/RIWhistory';
import RIWproductionCard from 'components/cards/RIWproduction';
import RIWsurveyCard from 'components/cards/RIWsurvey';
import RIWplanningCard from 'components/cards/RIWplanning';

const RingInspector = () => {
  const baseURL = '/api/widgets/ring-inspector/';
  const [completedRingsSwitch, setCompletedRingsSwitch] = useState(false);
  const [levelSelect, setLevelSelect] = useState('');
  const [driveSelect, setDriveSelect] = useState('');
  const [ringSelect, setRingSelect] = useState('');
  const [levels, setLevels] = useState([]);
  const [drives, setDrives] = useState([]);
  const [rings, setRings] = useState([]);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    // Fetch levels data on component mount
    fetchLevels();
  });

  const fetchLevels = () => {
    const requestURL = `${baseURL}levels/?includeCompleted=${completedRingsSwitch}`;
    axios
      .get(requestURL)
      .then((response) => {
        setLevels(response.data);
      })
      .catch((error) => {
        console.error('Error fetching levels:', error);
      });
  };

  const levelChange = (event) => {
    setShowResults(false);
    const selectedLevel = event.target.value;

    setLevelSelect(selectedLevel.toString());
    const requestURL = `${baseURL}${selectedLevel}?includeCompleted=${completedRingsSwitch}`;

    axios
      .get(requestURL)
      .then((response) => {
        const driveData = response.data;
        setDriveSelect('');
        setDrives(driveData);
        setRingSelect('');
        setRings([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const driveChange = (event) => {
    setShowResults(false);
    const selectedDrive = event.target.value;
    setDriveSelect(selectedDrive);
    const requestURL = `${baseURL}${levelSelect}/${selectedDrive}?includeCompleted=${completedRingsSwitch}`;

    axios
      .get(requestURL)
      .then((response) => {
        const ringData = response.data;
        setRings(ringData);
        setRingSelect('');
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const ringChange = (event) => {
    setRingSelect(event.target.value);
    setShowResults(true);
  };

  const toggleSwitch = (event) => {
    setCompletedRingsSwitch(event.target.checked);
    setLevelSelect('');
    setDriveSelect('');
    setDrives([]);
    setRingSelect('');
    setRings([]);
  };

  return (
    <Grid>
      <MainCard>
        <Grid item container direction="row" justifyContent="space-between" alignItems="flex-start">
          <Typography variant="h3">Ring Inspector</Typography>
          <Grid>
            <FormControl component="fieldset">
              <FormGroup aria-label="position">
                <FormControlLabel
                  value={completedRingsSwitch}
                  onChange={toggleSwitch}
                  control={<Switch color="primary" />}
                  label="Include completed rings"
                  labelPlacement="start"
                />
              </FormGroup>
            </FormControl>
          </Grid>
          <Grid>
            <FormControl sx={{ minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Level</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={levelSelect}
                onChange={levelChange}
                autoWidth
              >
                {levels.map((level) => (
                  <MenuItem key={level} value={level}>
                    {level}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 130 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Drive</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={driveSelect}
                onChange={driveChange}
                autoWidth
              >
                {drives.map((drive) => (
                  <MenuItem key={drive} value={drive}>
                    {drive}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <FormControl sx={{ minWidth: 80 }}>
              <InputLabel id="demo-simple-select-autowidth-label">Ring</InputLabel>
              <Select
                labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                value={ringSelect}
                onChange={ringChange}
                autoWidth
              >
                {rings.map((ring) => (
                  <MenuItem key={ring} value={ring}>
                    {ring}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </MainCard>
      {showResults ? (
        <MainCard>
          <Grid item container direction="row" justifyContent="space-between" alignItems="flex-start"></Grid>
          <Grid container spacing={2}>
            <Grid item xs={12} lg={4} sm={6}>
              <RIWplanningCard editable={false} level={levelSelect} drive={driveSelect} ring={ringSelect} />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
              <RIWgeologyCard editable={true} level={levelSelect} drive={driveSelect} ring={ringSelect} />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
              <RIWproductionCard editable={true} level={levelSelect} drive={driveSelect} ring={ringSelect} />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
              <RIWgeotechnicalCard editable={true} level={levelSelect} drive={driveSelect} ring={ringSelect} />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
              <RIWsurveyCard editable={true} level={levelSelect} drive={driveSelect} ring={ringSelect} />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
              <RIWengineeringCard editable={true} level={levelSelect} drive={driveSelect} ring={ringSelect} />
            </Grid>
            <Grid item xs={12} lg={4} sm={6}>
              <RIWhistoryCard editable={false} level={levelSelect} drive={driveSelect} ring={ringSelect} />
            </Grid>
          </Grid>
        </MainCard>
      ) : null}
    </Grid>
  );
};

export default RingInspector;
