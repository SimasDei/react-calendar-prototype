import LocationOnIcon from '@mui/icons-material/LocationOn';
import {
  Avatar,
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Pagination,
  Select,
  SelectChangeEvent,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import { useUserContext } from '../context/UserContext';
import { User, UserRole } from '../utils/factories';
import { roleIcons } from './RoleIcons';

const RolesPermissions: React.FC = () => {
  const { users, selectUser, deleteUser } = useUserContext();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterAttribute, setFilterAttribute] = useState<keyof User>('name');
  const usersPerPage = 10;

  const handleSelectAllClick = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      const newSelecteds = currentUsers.map((user) => user.id);
      setSelectedUsers(newSelecteds);
      return;
    }
    setSelectedUsers([]);
  };

  const handleClick = (_: React.MouseEvent<unknown>, id: string) => {
    const selectedIndex = selectedUsers.indexOf(id);
    let newSelected: string[] = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selectedUsers, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selectedUsers.slice(1));
    } else if (selectedIndex === selectedUsers.length - 1) {
      newSelected = newSelected.concat(selectedUsers.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selectedUsers.slice(0, selectedIndex), selectedUsers.slice(selectedIndex + 1));
    }

    setSelectedUsers(newSelected);
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterAttributeChange = (event: SelectChangeEvent<keyof User>) => {
    setFilterAttribute(event.target.value as keyof User);
  };

  const filteredUsers = users.filter((user) => user[filterAttribute].toString().toLowerCase().includes(searchTerm.toLowerCase()));

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const isSelected = (id: string) => selectedUsers.indexOf(id) !== -1;

  const handleRoleChange = (event: SelectChangeEvent<UserRole>) => {
    const newRole = event.target.value as UserRole;
    const updatedUsers = users.map((user) => (selectedUsers.includes(user.id) ? { ...user, role: newRole } : user));
    updatedUsers.forEach((user) => selectUser(user));
    setSelectedUsers([]);
  };

  const handleDelete = () => {
    selectedUsers.forEach((id) => deleteUser(id));
    setSelectedUsers([]);
  };

  const selectedUserRole = selectedUsers.length > 0 ? users.find((user) => user.id === selectedUsers[0])?.role : '';

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h5" gutterBottom>
        Roles & Permissions
      </Typography>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
        <Box sx={{ display: 'flex', gap: 2 }}>
          <TextField label="Search" variant="outlined" value={searchTerm} onChange={handleSearchChange} />
          <FormControl variant="outlined">
            <InputLabel>Filter By</InputLabel>
            <Select value={filterAttribute} onChange={handleFilterAttributeChange} label="Filter By">
              <MenuItem value="name">Name</MenuItem>
              <MenuItem value="email">Email</MenuItem>
              <MenuItem value="location">Location</MenuItem>
              <MenuItem value="role">Role</MenuItem>
            </Select>
          </FormControl>
        </Box>
        {selectedUsers.length > 0 && (
          <Box sx={{ display: 'flex', gap: 2 }}>
            <FormControl variant="outlined">
              <InputLabel>Change Role</InputLabel>
              <Select value={selectedUserRole} onChange={handleRoleChange} label="Change Role">
                {Object.values(UserRole).map((role) => (
                  <MenuItem key={role} value={role}>
                    {role}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
            <Button variant="contained" color="secondary" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        )}
      </Box>
      <TableContainer>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox">
                <Checkbox
                  indeterminate={selectedUsers.length > 0 && selectedUsers.length < currentUsers.length}
                  checked={currentUsers.length > 0 && selectedUsers.length === currentUsers.length}
                  onChange={handleSelectAllClick}
                />
              </TableCell>
              <TableCell>User</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Location</TableCell>
              <TableCell>Role</TableCell>
              <TableCell>ID</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {currentUsers.map((user) => {
              const isItemSelected = isSelected(user.id);
              return (
                <TableRow
                  key={user.id}
                  hover
                  onClick={(event) => handleClick(event, user.id)}
                  role="checkbox"
                  aria-checked={isItemSelected}
                  selected={isItemSelected}
                >
                  <TableCell padding="checkbox">
                    <Checkbox checked={isItemSelected} />
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar src={user.avatar} sx={{ mr: 2 }} />
                      <Typography>{user.name}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationOnIcon sx={{ mr: 1 }} color="disabled" />
                      <Typography>{user.location}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      {roleIcons[user.role]}
                      <Typography sx={{ ml: 1 }}>{user.role}</Typography>
                    </Box>
                  </TableCell>
                  <TableCell>{user.id}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
      <Pagination count={Math.ceil(filteredUsers.length / usersPerPage)} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
    </Box>
  );
};

export default RolesPermissions;
