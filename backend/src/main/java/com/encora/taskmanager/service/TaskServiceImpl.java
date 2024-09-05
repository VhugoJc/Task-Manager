package com.encora.taskmanager.service;

import com.encora.taskmanager.dto.ErrorResponseDto;
import com.encora.taskmanager.exception.TaskNotFoundException;
import com.encora.taskmanager.exception.UserNotFoundException;
import com.encora.taskmanager.model.Task;
import com.encora.taskmanager.model.User;
import com.encora.taskmanager.repository.TaskRepository;
import com.encora.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Locale;
import java.util.NoSuchElementException;

@Service
public class TaskServiceImpl implements TaskService{
    private final TaskRepository taskRepository;
    private final UserRepository userRepository;
    private final MessageSource messageSource;
    @Value("${app.locale}")
    private  String currentLocale;

    public TaskServiceImpl(TaskRepository taskRepository, UserRepository userRepository, MessageSource messageSource) {
        this.taskRepository = taskRepository;
        this.userRepository = userRepository;
        this.messageSource =messageSource;
    }

    @Override
    public Task createTask(Task task, String id) {
        User user = userRepository.findById(id)
                .orElseThrow(() -> new UserNotFoundException(messageSource.getMessage(
                        "user.not.found",
                        null,
                        Locale.forLanguageTag(currentLocale))));
        task.setUser(user); // Set the fetched user
        return taskRepository.save(task);
    }

    @Override
    public List<Task> getTasksByUserId(String userId) {
        return taskRepository.findByUserId(userId);
    }

    @Override
    public Task updateTask(String id, Task task, String userId) {
        try {
            // Try to find the task by ID
            Task existingTask = taskRepository.findById(id).get();

            // Check if the task has an associated user
            if (existingTask.getUser() == null || !existingTask.getUser().getEmail().equals(userId)) {
                throw new UserNotFoundException(messageSource.getMessage(
                        "user.not.authorized",
                        null,
                        Locale.forLanguageTag(currentLocale)));
            }

            task.setId(id);
            task.setUser(existingTask.getUser()); // Ensure the user reference is preserved
            return taskRepository.save(task);

        } catch (NoSuchElementException e) {
            // Handle the case where the task is not found
            throw new TaskNotFoundException(messageSource.getMessage(
                    "task.not.found",
                    new Object[] {id},
                    Locale.forLanguageTag(currentLocale)));
        }
    }

    @Override
    public void deleteTask(String id, String userId) {
        Task existingTask = taskRepository.findById(id)
                .orElseThrow(() ->   new UserNotFoundException(messageSource.getMessage(
                "user.not.found",
                null,
                Locale.forLanguageTag(currentLocale))));
        if (!existingTask.getUser().getId().equals(userId)) {
            throw new UserNotFoundException(messageSource.getMessage(
                    "user.not.authorized",
                    null,
                    Locale.forLanguageTag(currentLocale)));
        }
        taskRepository.deleteById(id);
    }


}