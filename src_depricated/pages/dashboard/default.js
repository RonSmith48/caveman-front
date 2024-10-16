import React from 'react';
import useAuth from 'hooks/useAuth';

// dashboards
import DashboardEngineering from './engineering';
import DashboardFPElectrical from './fp-electrical';
import DashboardFPMechanical from './fp-mechanical';
import DashboardGeology from './geology';
import DashboardPitram from './pitram';
import DashboardProduction from './production';
import DashboardGuest from './guest';

// ==============================|| SAMPLE PAGE ||============================== //

const DashboardDefault = () => {
  const { user } = useAuth();

  // this list also exists in
  // sections/apps/profiles/account/TabProfile.js
  if (user && user.role) {
    switch (user.role) {
      case 'Manager':
        return <DashboardEngineering />;
      case 'Mine Captain':
        return <DashboardEngineering />;
      case 'Production Shiftboss':
        return <DashboardProduction />;
      case 'Development Shiftboss':
        return <DashboardEngineering />;
      case 'Operations Shiftboss':
        return <DashboardEngineering />;
      case 'Production Engineer':
        return <DashboardEngineering />;
      case 'Development Engineer':
        return <DashboardEngineering />;
      case 'Geotechnical Engineer':
        return <DashboardEngineering />;
      case 'Electrical Engineer':
        return <DashboardFPElectrical />;
      case 'Mechanical Engineer':
        return <DashboardFPMechanical />;
      case 'Geologist':
        return <DashboardGeology />;
      case 'Surveyor':
        return <DashboardEngineering />;
      case 'Mobile Maint Planner':
        return <DashboardEngineering />;
      case 'Pitram Operator':
        return <DashboardPitram />;
      default:
        return <DashboardGuest />;
    }
  } else {
    return <DashboardGuest />;
  }
};

export default DashboardDefault;
