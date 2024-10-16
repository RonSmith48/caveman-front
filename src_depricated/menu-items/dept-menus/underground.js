// third-party
import { BuildOutlined } from '@ant-design/icons';

import { GrainOutlined, FactoryOutlined } from '@mui/icons-material';

const icons = {
  BuildOutlined,
  GrainOutlined,
  FactoryOutlined
};

const underground = {
  id: 'group-underground',
  title: 'Underground',
  type: 'group',
  children: [
    {
      id: 'prod-shiftboss-collapse',
      title: 'Production Dept',
      type: 'collapse',
      icon: icons.FactoryOutlined,
      children: [
        {
          id: 'lsr',
          title: 'Level Status Report',
          type: 'item',
          url: '/production/level-status',
          breadcrumbs: false
        },
        {
          id: 'prod-level-updates',
          title: 'Latest Updates',
          type: 'item',
          url: '/production/prod-level-updates',
          breadcrumbs: false
        },
        {
          id: 'production-drilling',
          title: 'Production Drilling',
          type: 'item',
          url: '/production/drilling',
          breadcrumbs: false
        },
        {
          id: 'ring-inspector',
          title: 'Ring Inspector',
          type: 'item',
          url: '/production/ringinspector',
          breadcrumbs: false
        },
        {
          id: 'schedule',
          title: 'Schedule',
          type: 'item',
          url: '/production/schedule',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'development-collapse',
      title: 'Development Dept',
      type: 'collapse',
      icon: icons.GrainOutlined,
      children: [
        {
          id: 'development',
          title: 'Development',
          type: 'item',
          url: '/development/development',
          breadcrumbs: false
        },
        {
          id: 'schedule',
          title: 'Schedule',
          type: 'item',
          url: '/development/schedule',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'operations-collapse',
      title: 'Operations Dept',
      type: 'collapse',
      icon: icons.BuildOutlined,
      children: [
        {
          id: 'schedule',
          title: 'Schedule',
          type: 'item',
          url: '/development/schedule',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default underground;
