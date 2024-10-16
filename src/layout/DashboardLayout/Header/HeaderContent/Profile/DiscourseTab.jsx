import { useState } from 'react';

// material-ui
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

// assets
import CommentOutlined from '@ant-design/icons/CommentOutlined';
import LockOutlined from '@ant-design/icons/LockOutlined';
import QuestionCircleOutlined from '@ant-design/icons/QuestionCircleOutlined';
import UserOutlined from '@ant-design/icons/UserOutlined';
import UnorderedListOutlined from '@ant-design/icons/UnorderedListOutlined';
import { BugOutlined, BulbOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - DISCOURSE TAB ||============================== //

export default function DiscourseTab({ handleClose }) {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose(event);
  };

  return (
    <List component="nav" sx={{ p: 0, '& .MuiListItemIcon-root': { minWidth: 32 } }}>
      <ListItemButton selected={selectedIndex === 0} onClick={(event) => handleListItemClick(event, 0)}>
        <ListItemIcon>
          <BugOutlined />
        </ListItemIcon>
        <ListItemText primary="Bug Reports" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 1} onClick={(event) => handleListItemClick(event, 1)}>
        <ListItemIcon>
          <BulbOutlined />
        </ListItemIcon>
        <ListItemText primary="Suggestions" />
      </ListItemButton>
      <ListItemButton selected={selectedIndex === 2} onClick={(event) => handleListItemClick(event, 2)}>
        <ListItemIcon>
          <QuestionCircleOutlined />
        </ListItemIcon>
        <ListItemText primary="Questions" />
      </ListItemButton>
    </List>
  );
}
