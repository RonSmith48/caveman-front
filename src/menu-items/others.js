// third-party
//import { FormattedMessage } from 'react-intl';
import { SettingOutlined, UploadOutlined, ToolOutlined } from '@ant-design/icons';

const icons = {
  SettingOutlined,
  UploadOutlined,
  ToolOutlined
};

const others = {
  id: 'group-others',
  title: 'Others',
  //title: <FormattedMessage id="Others" />,
  type: 'group',
  children: [
    {
      id: 'settings',
      title: 'Settings',
      //title: <FormattedMessage id="Settings" />,
      type: 'item',
      url: '#',
      icon: icons.SettingOutlined
    },
    {
      id: 'fileupload',
      title: 'File Upload',
      //title: <FormattedMessage id="File Upload" />,
      type: 'collapse',
      icon: icons.UploadOutlined,
      children: [
        {
          id: 'tinderupload',
          //title: <FormattedMessage id="TinderLite Upload" />,
          type: 'item',
          url: '/uploads/tinderlite'
        },
        {
          id: 'dupe',
          title: 'PMD Dupe',
          //title: <FormattedMessage id="PMD Dupe" />,
          type: 'item',
          url: '/uploads/dupe'
        }
      ]
    }
  ]
};

export default others;
