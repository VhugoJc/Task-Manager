package com.encora.taskmanager.service;

import com.encora.taskmanager.model.Task;
import com.encora.taskmanager.model.User;
import com.encora.taskmanager.repository.TaskRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;

    public TaskServiceImpl(TaskRepository taskRepository) {
        this.taskRepository = taskRepository;
    }

    @Override
    public Task createTask(Task task, String userId) {
        task.setUser(new User(userId)); // Set the user reference
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getTasksByUserId(String userId) {
        return taskRepository.findByUserId(userId);
    }

    @Override
    public Task updateTask(String id, Task task, String userId) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));

        if (!existingTask.getUser().getId().equals(userId)) {
            throw new RuntimeException("User not authorized to update this task");
        }
        task.setId(id);
        task.setUser(existingTask.getUser()); // Ensure the user reference is preserved
        return taskRepository.save(task);
    }

    @Override
    public void deleteTask(String id, String userId) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("Task not found with id: " + id));
        if (!existingTask.getUser().getId().equals(userId)) {
            throw new RuntimeException("User not authorized to delete this task");
        }
        taskRepository.deleteById(id);
    }

}
