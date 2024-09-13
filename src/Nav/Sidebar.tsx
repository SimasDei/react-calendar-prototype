import { AirplanemodeActive, Build, CalendarToday, Menu, Settings } from '@mui/icons-material';
import { Avatar, Box, Drawer, IconButton, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';

const drawerWidthExpanded = 240;
const drawerWidthCollapsed = 70;

const Sidebar: React.FC = () => {
  const { mainUser } = useUserContext();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(true);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  const handleAvatarClick = () => {
    navigate('/settings', { state: { tab: 2 } });
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
      <Box style={{ display: 'flex', justifyContent: 'center', padding: '10px' }}>
        <IconButton
          onClick={toggleSidebar}
          sx={{
            padding: '5px',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <Menu />
        </IconButton>
      </Box>
      <List>
        {mainUser && (
          <ListItemButton onClick={handleAvatarClick}>
            <ListItemIcon>
              <Avatar alt={mainUser.username} src={mainUser.avatar} />
            </ListItemIcon>
            <ListItemText primary={mainUser.name.split(' ')[0]} sx={{ display: collapsed ? 'none' : 'block' }} />
          </ListItemButton>
        )}
        <ListItem
          component={Link}
          to="/"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            justifyContent: collapsed ? 'center' : 'flex-start',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              minWidth: collapsed ? 'auto' : '56px',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <CalendarToday />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Calendar" />}
        </ListItem>
        <ListItem
          component={Link}
          to="/aircraft-specification"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            justifyContent: collapsed ? 'center' : 'flex-start',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              minWidth: collapsed ? 'auto' : '56px',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <AirplanemodeActive />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Aircraft Specification" />}
        </ListItem>
        <ListItem
          component={Link}
          to="/settings"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            justifyContent: collapsed ? 'center' : 'flex-start',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              minWidth: collapsed ? 'auto' : '56px',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <Settings />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Settings" />}
        </ListItem>
        <ListItem
          component={Link}
          to="/maintenance"
          sx={{
            textDecoration: 'none',
            color: 'inherit',
            justifyContent: collapsed ? 'center' : 'flex-start',
            '&:hover': {
              backgroundColor: 'rgba(0, 0, 0, 0.1)',
            },
          }}
        >
          <ListItemIcon
            sx={{
              justifyContent: 'center',
              minWidth: collapsed ? 'auto' : '56px',
              '&:hover': {
                color: 'primary.main',
              },
            }}
          >
            <Build />
          </ListItemIcon>
          {!collapsed && <ListItemText primary="Maintenance" />}
        </ListItem>
      </List>
    </Drawer>
  );
};

export default Sidebar;
