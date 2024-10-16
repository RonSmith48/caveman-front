// third-party
import { FormattedMessage } from 'react-intl';

// project import
import { useGetMenu } from 'api/menu';

// assets
import {
  GoldOutlined,
  BorderOutlined,
  BoxPlotOutlined,
  StockOutlined,
  DashboardOutlined,
  DeploymentUnitOutlined,
  BarChartOutlined,
  MenuUnfoldOutlined,
  LoadingOutlined,
  StopOutlined,
  MonitorOutlined,
  BellOutlined,
  ScheduleOutlined,
  CompassOutlined
} from '@ant-design/icons';

import {
  LogoDevOutlined,
  GrainOutlined,
  LandslideOutlined,
  ArchitectureOutlined,
  ImportExportOutlined,
  TextureOutlined,
  PrecisionManufacturingOutlined,
  WorkspacesOutlined,
  FactoryOutlined,
  RuleOutlined
} from '@mui/icons-material';

// icons
const icons = {
  geology: GoldOutlined,
  stock: StockOutlined,
  dashboard: DashboardOutlined,
  menu_unfold: MenuUnfoldOutlined,
  boxplot: BoxPlotOutlined,
  stop: StopOutlined,
  border: BorderOutlined,
  barchart: BarChartOutlined,
  loading: LoadingOutlined,
  drilling: DeploymentUnitOutlined,
  inspector: MonitorOutlined,
  latest: BellOutlined,
  schedule: ScheduleOutlined,
  production: FactoryOutlined,
  survey: CompassOutlined,
  dev: LogoDevOutlined,
  development: GrainOutlined,
  geotech: LandslideOutlined,
  engineering: ArchitectureOutlined,
  hoist: ImportExportOutlined,
  hazard: TextureOutlined,
  automation: PrecisionManufacturingOutlined,
  oversize: WorkspacesOutlined,
  verify: RuleOutlined
};

const loadingMenu = {
  id: 'group-dashboard-loading',
  title: <FormattedMessage id="dashboard" />,
  type: 'group',
  icon: icons.loading,
  children: []
};

// ==============================|| MENU ITEMS - API ||============================== //

export const MenuFromAPI = () => {
  const { menu, menuLoading } = useGetMenu();

  if (menuLoading) return loadingMenu;

  const subChildrenList = (children) => {
    return children?.map((subList) => {
      return fillItem(subList);
    });
  };

  const itemList = (subList) => {
    let list = fillItem(subList);

    // if collapsible item, we need to fill its children as well
    if (subList.type === 'collapse') {
      list.children = subChildrenList(subList.children);
    }
    return list;
  };

  const childrenList = menu?.children?.map((subList) => {
    return itemList(subList);
  });

  let menuList = fillItem(menu, childrenList);
  return menuList;
};

function fillItem(item, children) {
  return {
    ...item,
    title: <FormattedMessage id={`${item?.title}`} />,
    // @ts-ignore
    icon: icons[item?.icon],
    ...(children && { children })
  };
}
