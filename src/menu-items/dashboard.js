// third-party
//import { FormattedMessage } from 'react-intl';

// assets
import { DashboardOutlined, HomeOutlined } from '@ant-design/icons';

// icons
const icons = {
  DashboardOutlined,
  HomeOutlined
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
  id: 'group-dashboard',
  type: 'group',
  children: [
    {
      id: 'dashboard',
      title: 'Dashboard',
      type: 'item',
      icon: icons.DashboardOutlined,
      url: '/dashboard',
      breadcrumbs: false
    }
  ]
};

export default dashboard;
