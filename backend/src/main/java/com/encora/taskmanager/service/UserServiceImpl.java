package com.encora.taskmanager.service;

import com.encora.taskmanager.model.User;
import com.encora.taskmanager.repository.UserRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;
@Service
public class UserServiceImpl implements UserService{
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(UserRepository userRepository, PasswordEncoder passwordEncoder) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public User saveUser(User user) {
        user.setPassword(passwordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    @Override
    public Optional<User> getUserById(String id) {
        return userRepository.findById(id);
    }

    @Override
    public User updateUser(String id, User user) {
        return userRepository.findById(id)
                .map(existingUser -> {
                    // Update the fields of the existing user
                    existingUser.setName(user.getName());
                    existingUser.setEmail(user.getEmail());
                    existingUser.setPassword(user.getPassword());
                    // Save and return the updated user
                    return userRepository.save(existingUser);
                }).orElseThrow(() -> new RuntimeException("User not found with id " + id));
    }

    @Override
    public void deleteUserById(String id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
        } else {
            throw new RuntimeException("User not found with id " + id);
        }
    }

    @Override
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
}
