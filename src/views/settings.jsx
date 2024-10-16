// material-ui
import Typography from '@mui/material/Typography';

// project imports
import MainCard from 'components/MainCard';
import SettingsTabs from 'sections/apps/settings/Settings';

export default function Settings() {
  return (
    <MainCard title="Caveman Global Settings">
      <SettingsTabs />
    </MainCard>
  );
}
