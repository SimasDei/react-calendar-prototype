import { faker } from '@faker-js/faker';
import { Box, Button, Grid, MenuItem, Select, TextField } from '@mui/material';
import React, { useState } from 'react';
import { User, UserRole } from '../utils/factories';

interface UserFormProps {
  onAddUser: (user: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ onAddUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<UserRole>(UserRole.Admin);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const newUser: User = {
      id: faker.string.uuid(),
      name,
      username: name.replace(' ', '.').toLowerCase(),
      email,
      avatar: `https://api.dicebear.com/9.x/pixel-art/svg?seed=${name.split(' ')[0].toLowerCase()}`,
      role,
      comments: [],
      location: faker.location.city(),
    };
    onAddUser(newUser);
    setName('');
    setEmail('');
    setRole(UserRole.Admin);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField label="Name" variant="outlined" fullWidth value={name} onChange={(e) => setName(e.target.value)} required />
        </Grid>
        <Grid item xs={12}>
          <TextField label="Email" variant="outlined" fullWidth value={email} onChange={(e) => setEmail(e.target.value)} required />
        </Grid>
        <Grid item xs={12}>
          <Select label="Role" variant="outlined" fullWidth value={role} onChange={(e) => setRole(e.target.value as UserRole)} required>
            {Object.values(UserRole).map((role) => (
              <MenuItem key={role} value={role}>
                {role}
              </MenuItem>
            ))}
          </Select>
        </Grid>
        <Grid item xs={12}>
          <Button type="submit" variant="contained" color="primary">
            Add User
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

export default UserForm;
