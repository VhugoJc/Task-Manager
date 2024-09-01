package com.encora.taskmanager.controller;

import com.encora.taskmanager.exception.InvalidJwtTokenException;
import com.encora.taskmanager.exception.UserNotFoundException;
import com.encora.taskmanager.model.Task;
import com.encora.taskmanager.service.TaskService;
import com.encora.taskmanager.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    private static final Logger log = LoggerFactory.getLogger(TaskController.class);
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        try {
            String userId = SecurityUtils.getUserIdFromJwt();
            log.info("Authenticated user ID: {}",userId);
            Task createdTask = taskService.createTask(task, userId);
            return ResponseEntity.ok(createdTask);
        }  catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (InvalidJwtTokenException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }
}
