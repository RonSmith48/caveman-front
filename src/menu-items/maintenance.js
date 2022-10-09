// third-party
//import { FormattedMessage } from 'react-intl';

// assets
import {
  GoldOutlined,
  BorderOutlined,
  BoxPlotOutlined,
  CompassOutlined,
  DeploymentUnitOutlined,
  GatewayOutlined,
  MenuUnfoldOutlined,
  ToolOutlined,
  StopOutlined
} from '@ant-design/icons';

// icons
const icons = {
  GoldOutlined,
  CompassOutlined,
  MenuUnfoldOutlined,
  BoxPlotOutlined,
  StopOutlined,
  BorderOutlined,
  ToolOutlined,
  GatewayOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const maintenance = {
  id: 'maintenance',
  title: 'Maintenance',
  //title: <FormattedMessage id="Maintenance" />,
  type: 'group',
  children: [
    {
      id: 'mobile-maint',
      title: 'Mobile Maint',
      //title: <FormattedMessage id="Mobile Maint" />,
      type: 'item',
      url: '/maintenance/mobile-maint',
      icon: icons.ToolOutlined
    }
  ]
};

export default maintenance;
