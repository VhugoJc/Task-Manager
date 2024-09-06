package com.encora.taskmanager.repository;

import com.encora.taskmanager.model.Task;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TaskRepository extends MongoRepository<Task, String> {
    // Custom query methods
    List<Task> findByUserId(String userId);    // Find tasks by user ID
}