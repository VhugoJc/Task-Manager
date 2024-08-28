package com.encora.taskmanager.repository;

import com.encora.taskmanager.model.User;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<User, String> {
    // Custom query method to find a user by email
    User findByEmail(String email);
}