// third-party
import { SettingOutlined, UploadOutlined, ToolOutlined, GoldOutlined, CompassOutlined, QuestionCircleOutlined } from '@ant-design/icons';

import { GrainOutlined, LandslideOutlined, ArchitectureOutlined, FactoryOutlined, MenuBookOutlined } from '@mui/icons-material';

const icons = {
  SettingOutlined,
  UploadOutlined,
  ToolOutlined,
  GoldOutlined,
  CompassOutlined,
  GrainOutlined,
  LandslideOutlined,
  ArchitectureOutlined,
  FactoryOutlined,
  QuestionCircleOutlined,
  MenuBookOutlined
};

const other = {
  id: 'group-other',
  title: 'Other',
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      type: 'item',
      url: '/settings',
      icon: icons.SettingOutlined
    },
    {
      id: 'fileupload',
      title: 'File Upload',
      type: 'collapse',
      icon: icons.UploadOutlined,
      children: [
        {
          id: 'dupe',
          title: 'PMD Dupe',
          type: 'item',
          url: '/uploads/dupe'
        }
      ]
    },
    {
      id: 'whatif',
      title: 'What If ?',
      type: 'item',
      url: '/whatif',
      icon: icons.QuestionCircleOutlined
    },
    {
      id: 'docs',
      title: 'Documentation',
      type: 'collapse',
      icon: icons.MenuBookOutlined,
      children: [
        {
          id: 'cms',
          title: 'Content Mgmt System',
          type: 'item',
          url: '#',
          breadcrumbs: false
        },
        {
          id: 'dig',
          title: 'Dig Search Engine',
          type: 'item',
          url: '#',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default other;
