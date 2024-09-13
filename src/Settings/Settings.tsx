import { Box, Divider, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { useUserContext } from '../context/UserContext';
import { User } from '../factories';
import RolesPermissions from './RolesPermissions';
import TabPanel from './TabPanel';
import UserForm from './UserForm';
import UserList from './UserList';
import UserModal from './UserModal';
import UserPreferences from './UserPreferences';

const Settings: React.FC = () => {
  const location = useLocation();
  const [value, setValue] = useState(0);
  const { users, addUser, selectedUser, selectUser } = useUserContext();
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    if (location.state && location.state.tab !== undefined) {
      setValue(location.state.tab);
    }
  }, [location.state]);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddUser = (newUser: User) => {
    addUser(newUser);
  };

  const handleUserClick = (user: User) => {
    selectUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    selectUser(null);
  };

  const handleTagClick = (username: string) => {
    const taggedUser = users.find((user) => user.username === username);
    if (taggedUser) {
      selectUser(taggedUser);
      setModalOpen(true);
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
        <Tab label="User Management" />
        <Tab label="Roles & Permissions" />
        <Tab label="Preferences" />
      </Tabs>

      <TabPanel value={value} index={0}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            User Management
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Add New User</Typography>
              <UserForm onAddUser={handleAddUser} />
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                Current Users
              </Typography>
              <UserList users={users} onUserClick={handleUserClick} />
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <RolesPermissions />
      </TabPanel>

      <TabPanel value={value} index={2}>
        <UserPreferences onTagClick={handleTagClick} />
      </TabPanel>

      <UserModal user={selectedUser} open={modalOpen} onClose={handleCloseModal} onTagClick={handleTagClick} />
    </Box>
  );
};

export default Settings;
