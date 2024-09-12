import { Avatar, Box, Card, CardActionArea, CardContent, Grid, Pagination, TextField, Typography } from '@mui/material';
import _ from 'lodash';
import React, { useCallback, useEffect, useState } from 'react';
import { User } from '../factories';
import UserModal from './UserModal';

interface UserListProps {
  users: User[];
}

const UserList: React.FC<UserListProps> = ({ users }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState(users);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const usersPerPage = 5;

  const debouncedSearch = useCallback(
    _.debounce((query: string) => {
      const filtered = users.filter((user) => user.name.toLowerCase().includes(query.toLowerCase()));
      setFilteredUsers(filtered);
      setCurrentPage(1);
    }, 300),
    [users]
  );

  useEffect(() => {
    debouncedSearch(searchQuery);
  }, [searchQuery, debouncedSearch]);

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handlePageChange = (_: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleUserClick = (user: User) => {
    setSelectedUser(user);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
    setSelectedUser(null);
  };

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers.slice(indexOfFirstUser, indexOfLastUser);

  return (
    <Box>
      <TextField label="Search Users" variant="outlined" fullWidth value={searchQuery} onChange={handleSearchChange} sx={{ mb: 2 }} />
      {currentUsers.map((user) => (
        <Card key={user.id} sx={{ mb: 2 }}>
          <CardActionArea onClick={() => handleUserClick(user)}>
            <CardContent>
              <Grid container alignItems="center" spacing={2}>
                <Grid item>
                  <Avatar src={user.avatar} alt={user.name} />
                </Grid>
                <Grid item xs>
                  <Typography variant="body1">{user.name}</Typography>
                  <Typography variant="body2" color="textSecondary">
                    {user.email}
                  </Typography>
                </Grid>
              </Grid>
            </CardContent>
          </CardActionArea>
        </Card>
      ))}
      <Pagination count={Math.ceil(filteredUsers.length / usersPerPage)} page={currentPage} onChange={handlePageChange} sx={{ mt: 2 }} />
      <UserModal user={selectedUser} open={modalOpen} onClose={handleCloseModal} />
    </Box>
  );
};

export default UserList;
