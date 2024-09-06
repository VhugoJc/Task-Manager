package com.encora.taskmanager.service;

import com.encora.taskmanager.model.User;

import java.util.Optional;

public interface UserService {
    User saveUser(User user);
    Optional<User> getUserById(String id);
    User updateUser(String id, User user);
    void deleteUserById(String id);
    Optional<User> getUserByEmail(String email);

}