// third-party
//import { FormattedMessage } from 'react-intl'; NO!

// assets
import {
  GoldOutlined,
  BorderOutlined,
  FlagOutlined,
  CompassOutlined,
  DeploymentUnitOutlined,
  GatewayOutlined,
  MenuUnfoldOutlined,
  SmileOutlined,
  StopOutlined
} from '@ant-design/icons';

// icons
const icons = {
  GoldOutlined,
  CompassOutlined,
  MenuUnfoldOutlined,
  FlagOutlined,
  StopOutlined,
  BorderOutlined,
  SmileOutlined,
  GatewayOutlined,
  DeploymentUnitOutlined
};

// ==============================|| MENU ITEMS - SUPPORT ||============================== //

const techservices = {
  id: 'tech-services',
  title: 'Tech Services',
  //title: <FormattedMessage id="Tech Services" />,
  type: 'group',
  children: [
    {
      id: 'engineering',
      title: 'Engineering',
      //title: <FormattedMessage id="Engineering" />,
      type: 'collapse',
      icon: icons.FlagOutlined,
      children: [
        {
          id: 'deswik',
          title: 'Deswik',
          //title: <FormattedMessage id="Deswik" />,
          type: 'item',
          url: '/tech-services/deswik'
        },
        {
          id: 'planning',
          title: 'Planning',
          //title: <FormattedMessage id="Planning" />,
          type: 'item',
          url: '/tech-services/planning'
        }
      ]
    },
    {
      id: 'survey',
      title: 'Survey',
      //title: <FormattedMessage id="Survey" />,
      type: 'item',
      url: '/tech-services/survey',
      icon: icons.CompassOutlined
    },
    {
      id: 'geology',
      title: 'Geology',
      //title: <FormattedMessage id="Geology" />,
      type: 'item',
      url: '/tech-services/geology',
      icon: icons.GoldOutlined
    }
  ]
};

export default techservices;
