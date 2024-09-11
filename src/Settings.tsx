import { Box, Button, Divider, Grid, Paper, Tab, Tabs, Typography } from '@mui/material';
import React, { useState } from 'react';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div role="tabpanel" hidden={value !== index} id={`simple-tabpanel-${index}`} aria-labelledby={`simple-tab-${index}`} {...other}>
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Settings: React.FC = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>

      {/* Tabs */}
      <Tabs value={value} onChange={handleChange} aria-label="settings tabs">
        <Tab label="User Management" />
        <Tab label="Roles & Permissions" />
        <Tab label="Preferences" />
      </Tabs>

      {/* Tab Content */}
      <TabPanel value={value} index={0}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            User Management
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Add New User</Typography>
              <Button variant="contained" color="primary">
                Add User
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Current Users</Typography>
              <Button variant="outlined" color="secondary">
                Manage Users
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Roles & Permissions
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Assign Roles</Typography>
              <Button variant="contained" color="primary">
                Assign Role
              </Button>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Manage Permissions</Typography>
              <Button variant="outlined" color="secondary">
                Edit Permissions
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Paper elevation={3} sx={{ p: 2 }}>
          <Typography variant="h5" gutterBottom>
            Preferences
          </Typography>
          <Divider />
          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6">Notification Settings</Typography>
              <Button variant="outlined" color="secondary">
                Edit Notifications
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </TabPanel>
    </Box>
  );
};

export default Settings;
