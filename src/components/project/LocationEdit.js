import * as React from 'react';
import Box from '@mui/material/Box';
import { SimpleTreeView } from '@mui/x-tree-view/SimpleTreeView';
import { TreeItem } from '@mui/x-tree-view/TreeItem';
import MainCard from 'components/MainCard';

export default function LocationEdit({ location_id }) {
  return (
    <MainCard title={'Edit Location'}>
      <Box sx={{ minHeight: 352, minWidth: 250 }}>
        <SimpleTreeView>
          <TreeItem itemId="concept" label="Design">
            <TreeItem itemId="concept1" label="@mui/x-data-grid" />
            <TreeItem itemId="concept2" label="@mui/x-data-grid-pro" />
            <TreeItem itemId="concept3" label="@mui/x-data-grid-premium" />
          </TreeItem>
          <TreeItem itemId="dev" label="Development">
            <TreeItem itemId="dev1" label="@mui/x-tree-view" />
          </TreeItem>
          <TreeItem itemId="prod" label="Production">
            <TreeItem itemId="prod1" label="@mui/x-date-pickers" />
            <TreeItem itemId="prod2" label="@mui/x-date-pickers-pro" />
          </TreeItem>
          <TreeItem itemId="geology" label="Geology">
            <TreeItem itemId="geology1" label="@mui/x-charts" />
          </TreeItem>
          <TreeItem itemId="geotech" label="Geotechnical">
            <TreeItem itemId="geotech1" label="@mui/x-tree-view" />
          </TreeItem>
          <TreeItem itemId="survey" label="Survey">
            <TreeItem itemId="survey1" label="@mui/x-tree-view" />
          </TreeItem>
        </SimpleTreeView>
      </Box>
    </MainCard>
  );
}
