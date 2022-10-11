// third-party
import { SettingOutlined, UploadOutlined, ToolOutlined } from '@ant-design/icons';

const icons = {
  SettingOutlined,
  UploadOutlined,
  ToolOutlined
};

const others = {
  id: 'group-others',
  title: 'Others',
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
          id: 'tinderupload',
          title: 'Tinder Upload',
          type: 'item',
          url: '/uploads/tinderlite'
        },
        {
          id: 'dupe',
          title: 'PMD Dupe',
          type: 'item',
          url: '/uploads/dupe'
        }
      ]
    }
  ]
};

export default others;
