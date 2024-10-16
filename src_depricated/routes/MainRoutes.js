import { lazy } from 'react';

// project import
import Loadable from 'components/Loadable';
import DashboardLayout from 'layout/Dashboard';
//import { element } from 'prop-types';

//=======================================================================
// pages routing
//=======================================================================
// DASHBOARD
const DashboardDefault = Loadable(lazy(() => import('pages/dashboard/default')));
const DashboardAnalytics = Loadable(lazy(() => import('pages/dashboard/analytics')));
// APPS
const WhatIfPage = Loadable(lazy(() => import('pages/what-if/whatif')));
const SettingsPage = Loadable(lazy(() => import('pages/settings/index')));

// PROFILE
const AccountProfile = Loadable(lazy(() => import('pages/apps/profiles/account')));
const AccountTabProfile = Loadable(lazy(() => import('sections/apps/profiles/account/TabProfile')));
const AccountTabAccount = Loadable(lazy(() => import('sections/apps/profiles/account/TabAccount')));
const AccountTabPassword = Loadable(lazy(() => import('sections/apps/profiles/account/TabPassword')));
const AccountTabRole = Loadable(lazy(() => import('sections/apps/profiles/account/TabRole')));
const AccountTabSettings = Loadable(lazy(() => import('sections/apps/profiles/account/TabSettings')));

// PRODUCTION
const LevelStatusPage = Loadable(lazy(() => import('pages/production/level-status')));

const LocationHistory = Loadable(lazy(() => import('pages/production/location-history')));
const ProductionDrilling = Loadable(lazy(() => import('pages/production/drilling')));
const RingInspector = Loadable(lazy(() => import('pages/production/ring-inspector')));
const ProdSchedulePage = Loadable(lazy(() => import('pages/production/schedule')));
// DEVELOPMENT
const DevelopmentPage = Loadable(lazy(() => import('pages/development/development')));
// TECH-SERVICES
const SurveyPage = Loadable(lazy(() => import('pages/tech-services/survey')));
const GeologyPage = Loadable(lazy(() => import('pages/tech-services/geology')));
const ConceptualRingsUploadPage = Loadable(lazy(() => import('pages/tech-services/conceptual-rings')));
const OrphanedRingsPage = Loadable(lazy(() => import('pages/tech-services/eng/orphaned-rings')));
const VerifyDCF = Loadable(lazy(() => import('pages/tech-services/eng/verify-dcf')));

// OTHER
const UnderConstruction = Loadable(lazy(() => import('pages/maintenance/under-construction')));
const DupeUploadPage = Loadable(lazy(() => import('pages/uploads/dupe')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: <DashboardLayout />,
      children: [
        {
          path: 'under-construction',
          element: <UnderConstruction />
        },
        {
          path: 'settings',
          element: <SettingsPage />
        },
        {
          path: 'whatif',
          element: <WhatIfPage />
        },
        {
          path: 'dashboard',
          children: [
            {
              path: 'default',
              element: <DashboardDefault />
            },
            {
              path: 'analytics',
              element: <DashboardAnalytics />
            }
          ]
        },
        {
          path: 'production',
          children: [
            {
              path: 'level-status',
              element: <LevelStatusPage />
            },
            {
              path: 'loc-history',
              element: <LocationHistory />
            },
            {
              path: 'drilling',
              element: <ProductionDrilling />
            },
            {
              path: 'ringinspector',
              element: <RingInspector />
            },
            {
              path: 'schedule',
              element: <ProdSchedulePage />
            }
          ]
        },
        {
          path: 'development',
          children: [
            {
              path: 'development',
              element: <DevelopmentPage />
            }
          ]
        },
        {
          path: 'tech-services',
          children: [
            {
              path: 'survey',
              element: <SurveyPage />
            },
            {
              path: 'geology',
              element: <GeologyPage />
            },
            {
              path: 'ip/conceptual-rings',
              element: <ConceptualRingsUploadPage />
            },
            {
              path: 'eng',
              children: [
                {
                  path: 'verification',
                  children: [
                    {
                      path: 'dcf',
                      element: <VerifyDCF />
                    },
                    {
                      path: 'orphaned-rings',
                      element: <OrphanedRingsPage />
                    }
                  ]
                }
              ]
            }
          ]
        },
        {
          path: 'uploads',
          children: [
            {
              path: 'dupe',
              element: <DupeUploadPage />
            }
          ]
        },
        {
          path: 'account',
          element: <AccountProfile />,
          children: [
            {
              path: 'profile',
              element: <AccountTabProfile />
            },
            {
              path: 'my-account',
              element: <AccountTabAccount />
            },
            {
              path: 'password',
              element: <AccountTabPassword />
            },
            {
              path: 'role',
              element: <AccountTabRole />
            },
            {
              path: 'settings',
              element: <AccountTabSettings />
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;
