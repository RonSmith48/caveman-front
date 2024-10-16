import PropTypes from 'prop-types';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

// material-ui
import { List, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

// assets
import { BugOutlined, BulbOutlined, QuestionCircleOutlined } from '@ant-design/icons';

// ==============================|| HEADER PROFILE - SETTING TAB ||============================== //

const RecourseTab = ({ handleClose }) => {
  const navigate = useNavigate();
  const [selectedIndex, setSelectedIndex] = useState(0);
  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
    handleClose(event);
    if (index === 0) {
      navigate('/under-construction');
    } else if (index === 1) {
      navigate('/under-construction');
    } else {
      navigate('/under-construction');
    }
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
};

RecourseTab.propTypes = {
  handleClose: PropTypes.func
};

export default RecourseTab;
