// third-party
import { GoldOutlined, CompassOutlined } from '@ant-design/icons';

import { LandslideOutlined, ArchitectureOutlined, EmojiFlagsOutlined } from '@mui/icons-material';

const icons = {
  GoldOutlined,
  CompassOutlined,
  LandslideOutlined,
  ArchitectureOutlined,
  EmojiFlagsOutlined
};

const techservices = {
  id: 'group-mts',
  title: 'Tech Services',
  type: 'group',
  children: [
    {
      id: 'engineering-collapse',
      title: 'Engineering',
      type: 'collapse',
      icon: icons.ArchitectureOutlined,
      children: [
        {
          id: 'schedule',
          title: 'Schedule',
          type: 'item',
          url: '#',
          breadcrumbs: false
        },
        {
          id: 'verify-collapse',
          title: 'Verifications',
          type: 'collapse',
          children: [
            {
              id: 'verify-dcf',
              title: 'Verify DCF',
              type: 'item',
              url: '/tech-services/eng/verification/dcf',
              breadcrumbs: false
            },
            {
              id: 'orphaned-rings',
              title: 'Orphaned Rings',
              type: 'item',
              url: '/tech-services/eng/verification/orphaned-rings',
              breadcrumbs: false
            }
          ]
        }
      ]
    },
    {
      id: 'int-planning-collapse',
      title: 'Intergrated Planning',
      type: 'collapse',
      icon: icons.EmojiFlagsOutlined,
      children: [
        {
          id: 'concept-upload',
          title: 'Conceptual Rings (EPS)',
          type: 'item',
          url: '/tech-services/ip/conceptual-rings',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'survey-collapse',
      title: 'Survey',
      type: 'collapse',
      icon: icons.CompassOutlined,
      children: [
        {
          id: 'survey',
          title: 'Survey',
          type: 'item',
          url: '/tech-services/survey',
          breadcrumbs: false
        },
        {
          id: 'schedule',
          title: 'Schedule',
          type: 'item',
          url: '#',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'geology-collapse',
      title: 'Geology',
      type: 'collapse',
      icon: icons.GoldOutlined,
      children: [
        {
          id: 'geology',
          title: 'Geology',
          type: 'item',
          url: '/tech-services/geology',
          breadcrumbs: false
        },
        {
          id: 'schedule',
          title: 'Schedule',
          type: 'item',
          url: '#',
          breadcrumbs: false
        }
      ]
    },
    {
      id: 'geotech-collapse',
      title: 'Geotechnical',
      type: 'collapse',
      icon: icons.LandslideOutlined,
      children: [
        {
          id: 'schedule',
          title: 'Schedule',
          type: 'item',
          url: '#',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default techservices;
