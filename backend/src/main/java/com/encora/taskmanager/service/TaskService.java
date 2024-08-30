package com.encora.taskmanager.service;


import com.encora.taskmanager.model.Task;

import java.util.List;

public interface TaskService {
    Task createTask(Task task, String userId);
    List<Task> getTasksByUserId(String userId);
    Task updateTask(String id, Task task, String userId);
    void deleteTask(String id, String userId);
}