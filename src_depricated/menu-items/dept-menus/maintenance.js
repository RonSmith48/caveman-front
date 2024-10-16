// third-party
//import { FormattedMessage } from 'react-intl';

// assets
import { ThunderboltOutlined, ToolOutlined } from '@ant-design/icons';

import { PrecisionManufacturingOutlined } from '@mui/icons-material';

// icons
const icons = {
  ThunderboltOutlined,
  ToolOutlined,
  PrecisionManufacturingOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const maintenance = {
  id: 'group-maintenance',
  title: 'Maintenance',
  type: 'group',
  children: [
    {
      id: 'mobile-maintenance',
      title: 'Mobile Maintenance',
      type: 'collapse',
      icon: icons.ToolOutlined,
      children: [
        {
          id: 'mobile-maint-schedule',
          title: 'Schedule',
          type: 'item',
          url: '#'
        }
      ]
    },
    {
      id: 'fixed-plant-electrical',
      title: 'Fixed Plant Electrical',
      type: 'collapse',
      icon: icons.ThunderboltOutlined,
      children: [
        {
          id: 'electrical-maint-schedule',
          title: 'Schedule',
          type: 'item',
          url: '#'
        }
      ]
    },
    {
      id: 'fixed-plant-mechanical',
      title: 'Fixed Plant Mechanical',
      type: 'collapse',
      icon: icons.PrecisionManufacturingOutlined,
      children: [
        {
          id: 'fixed-plant-maint-schedule',
          title: 'Schedule',
          type: 'item',
          url: '#'
        }
      ]
    }
  ]
};

export default maintenance;
