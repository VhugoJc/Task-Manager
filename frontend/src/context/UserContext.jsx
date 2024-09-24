"use client"
import React, { createContext, useState } from 'react';

// Create the context
export const UserContext = createContext();

// Create the provider component
export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const loginJWT = (jwt) => {
    setUser({ jwt });
    localStorage.setItem('token', jwt);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('token');
  };

  const getToken = () => {
    return user?.jwt;
  };

  const checkLocalStorage = () => {
    const token = localStorage.getItem('token');
    if (token) {
      setUser({ jwt: token });
      return true;
    }
    return false;
  };

  return (
    <UserContext.Provider value={{ user, loginJWT, logout, checkLocalStorage, getToken }}>
      {children}
    </UserContext.Provider>
  );
};