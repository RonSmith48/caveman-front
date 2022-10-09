// third-party
//import { FormattedMessage } from 'react-intl';

// assets
import {
  GoldOutlined,
  BorderOutlined,
  BoxPlotOutlined,
  StockOutlined,
  DeploymentUnitOutlined,
  BarChartOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  StopOutlined
} from '@ant-design/icons';

// icons
const icons = {
  GoldOutlined,
  StockOutlined,
  MenuUnfoldOutlined,
  BoxPlotOutlined,
  StopOutlined,
  BorderOutlined,
  SmileOutlined,
  BarChartOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const production = {
  id: 'production',
  title: 'Production',
  //title: <FormattedMessage id="Production" />,
  type: 'group',
  children: [
    {
      id: 'level-status',
      title: 'Level Status',
      //title: <FormattedMessage id="Level Status" />,
      type: 'item',
      url: '/production/level-status',
      icon: icons.BarChartOutlined
    },
    {
      id: 'production-drilling',
      title: 'Production Drilling',
      //title: <FormattedMessage id="Production Drilling" />,
      type: 'item',
      url: '/production/drilling',
      icon: icons.DeploymentUnitOutlined
    }
  ]
};

export default production;
