import React, { createContext, ReactNode, useContext, useState } from 'react';
import { User, UserFactory } from '../utils/factories';

interface UserContextType {
  users: User[];
  mainUser: User | null;
  setMainUser: (user: User | null) => void;
  addUser: (user: User) => void;
  deleteUser: (userId: string) => void;
  selectedUser: User | null;
  selectUser: (user: User | null) => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

const initialUsers = UserFactory.createUsers(50);
const randomMainUser = initialUsers[Math.floor(Math.random() * initialUsers.length)];

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [mainUser, setMainUser] = useState<User | null>(randomMainUser);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const addUser = (user: User) => {
    setUsers((prevUsers) => [user, ...prevUsers]);
  };

  const selectUser = (user: User | null) => {
    setSelectedUser(user);
  };

  const deleteUser = (userId: string) => {
    setUsers((prevUsers) => prevUsers.filter((user) => user.id !== userId));
  };

  return (
    <UserContext.Provider value={{ users, mainUser, setMainUser, addUser, deleteUser, selectedUser, selectUser }}>
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUserContext must be used within a UserProvider');
  }
  return context;
};
