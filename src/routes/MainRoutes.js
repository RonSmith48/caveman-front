import { lazy } from 'react';

// project import
import MainLayout from '../layout/MainLayout';
import Loadable from '../components/Loadable';
import AuthGuard from '../utils/route-guard/AuthGuard';

// render - dashboard
const DashboardDefault = Loadable(lazy(() => import('../pages/dashboard/default')));
//const DashboardAnalytics = Loadable(lazy(() => import('../pages/dashboard/analytics')));
const Docs = Loadable(lazy(() => import('../pages/docs/index')));
const LevelStatusPage = Loadable(lazy(() => import('../pages/production/level-status')));
const ProductionDrilling = Loadable(lazy(() => import('../pages/production/drilling')));
const DeswikPage = Loadable(lazy(() => import('../pages/tech-services/deswik')));
const PlanningPage = Loadable(lazy(() => import('../pages/tech-services/planning')));
const SurveyPage = Loadable(lazy(() => import('../pages/tech-services/survey')));
const GeologyPage = Loadable(lazy(() => import('../pages/tech-services/geology')));
const MobileMaintPage = Loadable(lazy(() => import('../pages/maintenance/mobile-maint')));
const TinderUploadPage = Loadable(lazy(() => import('../pages/uploads/tinderlite')));
const DupeUploadPage = Loadable(lazy(() => import('../pages/uploads/dupe')));

// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: '/',
  children: [
    {
      path: '/',
      element: (
        <AuthGuard>
          <MainLayout />
        </AuthGuard>
      ),
      children: [
        {
          path: 'docs',
          element: <Docs />
        },
        {
          path: 'dashboard',
          element: <DashboardDefault />
        },
        {
          path: 'production',
          children: [
            {
              path: 'level-status',
              element: <LevelStatusPage />
            },
            {
              path: 'drilling',
              element: <ProductionDrilling />
            }
          ]
        },
        {
          path: 'tech-services',
          children: [
            {
              path: 'deswik',
              element: <DeswikPage />
            },
            {
              path: 'planning',
              element: <PlanningPage />
            },
            {
              path: 'survey',
              element: <SurveyPage />
            },
            {
              path: 'geology',
              element: <GeologyPage />
            }
          ]
        },
        {
          path: 'maintenance',
          children: [
            {
              path: 'mobile-maint',
              element: <MobileMaintPage />
            }
          ]
        },
        {
          path: 'uploads/',
          children: [
            {
              path: 'tinderlite',
              element: <TinderUploadPage />
            },
            {
              path: 'dupe',
              element: <DupeUploadPage />
            }
          ]
        }
      ]
    }
  ]
};

export default MainRoutes;
