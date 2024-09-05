package com.encora.taskmanager.controller;

import com.encora.taskmanager.dto.TaskResponseDto;
import com.encora.taskmanager.exception.InvalidJwtTokenException;
import com.encora.taskmanager.exception.TaskNotFoundException;
import com.encora.taskmanager.exception.UserNotFoundException;
import com.encora.taskmanager.model.Task;
import com.encora.taskmanager.service.TaskService;
import com.encora.taskmanager.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    private static final Logger log = LoggerFactory.getLogger(TaskController.class);
    private final TaskService taskService;

    public TaskController(TaskService taskService) {
        this.taskService = taskService;
    }

    // Helper method to convert Task to TaskResponseDto
    private TaskResponseDto convertToDto(Task task) {
        TaskResponseDto responseDto = new TaskResponseDto();
        responseDto.setId(task.getId());
        responseDto.setName(task.getName());
        responseDto.setDueDate(task.getDueDate());
        responseDto.setCompleted(task.isCompleted());
        return responseDto;
    }

    @PostMapping
    public ResponseEntity<?> createTask(@RequestBody Task task) {
        try {
            String userId = SecurityUtils.getUserIdFromJwt();
            Task createdTask = taskService.createTask(task, userId);
            TaskResponseDto responseDto = convertToDto(createdTask);

            return ResponseEntity.ok(responseDto);
        }  catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (InvalidJwtTokenException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @GetMapping("/all")
    public ResponseEntity<?> getAllTasks() {
        try {

            String userId = SecurityUtils.getUserIdFromJwt();
            List<Task> tasks = taskService.getTasksByUserId(userId);

            // Convert the list of Tasks to a list of TaskResponseDto using Java Streams
            List<TaskResponseDto> tasksDto = tasks.stream()
                    .map(this::convertToDto) // Use the helper method here
                    .collect(Collectors.toList());

            return ResponseEntity.ok(tasksDto);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (InvalidJwtTokenException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateTask(@PathVariable String id, @RequestBody Task task) {
        try {
            String userId = SecurityUtils.getUserIdFromJwt();
            Task updatedTask = taskService.updateTask(id, task, userId);
            TaskResponseDto responseDto = convertToDto(updatedTask);
            return ResponseEntity.ok(responseDto);
        } catch (UserNotFoundException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(e.getMessage());
        } catch (InvalidJwtTokenException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(e.getMessage());
        } catch (TaskNotFoundException e) { // Catch TaskNotFoundException
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(e.getMessage());
        } catch (Exception e) { // Catch general exceptions
            System.out.println(e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("An error occurred while updating the task.");
        }
    }
}
