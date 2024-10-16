// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { SettingOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import { MenuBookOutlined } from '@mui/icons-material';
// type

// icons
const icons = {
  SettingOutlined,
  QuestionCircleOutlined,
  MenuBookOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const other = {
  id: 'group-other',
  title: <FormattedMessage id="other" />,
  type: 'group',
  children: [
    {
      id: 'settings',
      title: <FormattedMessage id="settings" />,
      type: 'item',
      url: '/settings',
      icon: icons.SettingOutlined
    },
    {
      id: 'whatif',
      title: <FormattedMessage id="what-if" />,
      type: 'item',
      url: '/whatif',
      icon: icons.QuestionCircleOutlined
    },
    {
      id: 'docs',
      title: <FormattedMessage id="documentation" />,
      type: 'collapse',
      icon: icons.MenuBookOutlined,
      children: [
        {
          id: 'cms',
          title: <FormattedMessage id="content-mgmt-system" />,
          type: 'item',
          url: '#',
          breadcrumbs: false
        },
        {
          id: 'dig',
          title: <FormattedMessage id="dig-search-engine" />,
          type: 'item',
          url: '#',
          breadcrumbs: false
        }
      ]
    }
  ]
};

export default other;
