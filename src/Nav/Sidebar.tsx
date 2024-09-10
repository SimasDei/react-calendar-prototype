import { AirplanemodeActive, CalendarToday, ChevronLeft, ChevronRight, Settings } from '@mui/icons-material';
import { Drawer, IconButton, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 70;

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: collapsed ? drawerWidthCollapsed : drawerWidthExpanded,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: collapsed ? drawerWidthCollapsed : drawerWidthExpanded,
          boxSizing: 'border-box',
          position: 'fixed',
        },
      }}
    >
      <IconButton onClick={toggleSidebar}>{collapsed ? <ChevronRight /> : <ChevronLeft />}</IconButton>
      <List>
        <ListItem component={Link} to="/" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemIcon>
            <CalendarToday />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Calendar" />}
        </ListItem>
        <ListItem component={Link} to="/settings" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemIcon>
            <Settings />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Settings" />}
        </ListItem>
        <ListItem component={Link} to="/aircraft-specification" sx={{ textDecoration: 'none', color: 'inherit' }}>
          <ListItemIcon>
            <AirplanemodeActive />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Aircraft Specification" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
