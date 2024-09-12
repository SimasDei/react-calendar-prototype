import { Box, Divider, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';
import { User, UserFactory } from '../factories';
import TabPanel from './TabPanel';
import UserForm from './UserForm';
import UserList from './UserList';
import UserModal from './UserModal';

const initialUsers = UserFactory.createUsers(50);

const Settings: React.FC = () => {
  const [value, setValue] = useState(0);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);

  const handleChange = (_: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const handleAddUser = (newUser: User) => {
    setUsers((prevUsers) => [newUser, ...prevUsers]);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const handleTagClick = (username: string) => {
    const taggedUser = users.find((user) => user.username === username);
    if (taggedUser) {
      setSelectedUser(taggedUser);
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
        <Box sx={{ p: 3 }}>Roles & Permissions Content</Box>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Box sx={{ p: 3 }}>Preferences Content</Box>
      </TabPanel>

      <UserModal user={selectedUser} open={modalOpen} onClose={handleCloseModal} onTagClick={handleTagClick} />
    </Box>
  );
};

export default Settings;
