// third-party
import { FormattedMessage } from 'react-intl';

// assets
import { PhoneOutlined } from '@ant-design/icons';
import { LandslideOutlined, ArchitectureOutlined, EmojiFlagsOutlined } from '@mui/icons-material';

// type

// icons
const icons = { PhoneOutlined, EmojiFlagsOutlined, LandslideOutlined, ArchitectureOutlined };

const production = {
  id: 'group-prod',
  title: <FormattedMessage id="production" />,
  type: 'group',
  children: [
    {
      id: 'lsr',
      title: <FormattedMessage id="level-status-report" />,
      type: 'item',
      url: '/prod/report/level-status'
    },
    {
      id: 'manual-entry',
      title: <FormattedMessage id="bdcf-manual-entry" />,
      type: 'item',
      url: '/prod/bdcf-manual-entry'
    }
  ]
};
export default production;
