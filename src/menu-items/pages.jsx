// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { PhoneOutlined } from '@ant-design/icons';
import { LandslideOutlined, ArchitectureOutlined, EmojiFlagsOutlined } from '@mui/icons-material';

// type

// icons
const icons = { PhoneOutlined, EmojiFlagsOutlined };

// ==============================|| MENU ITEMS - PAGES ||============================== //

const pages = {
  id: 'group-pages',
  title: <FormattedMessage id="pages" />,
  type: 'group',
  children: [
    {
      id: 'integrated-planning',
      title: <FormattedMessage id="integrated-planning" />,
      type: 'collapse',
      icon: icons.EmojiFlagsOutlined,
      children: [
        {
          id: 'fm-update',
          title: <FormattedMessage id="fm-update" />,
          type: 'item',
          url: '/ip/fm-update'
        },
        {
          id: 'prod-orphans',
          title: <FormattedMessage id="prod-orphans" />,
          type: 'item',
          url: '/ip/prod-orphans'
        },
        {
          id: 'ip-processing',
          title: <FormattedMessage id="processing" />,
          type: 'item',
          url: '/ip/processing'
        }
      ]
    }
  ]
};

export default pages;
