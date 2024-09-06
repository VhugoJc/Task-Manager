package com.encora.taskmanager.controller;

import com.encora.taskmanager.dto.ErrorResponseDto;
import com.encora.taskmanager.dto.SuccessfulResponse;
import com.encora.taskmanager.dto.TaskResponseDto;
import com.encora.taskmanager.exception.InvalidJwtTokenException;
import com.encora.taskmanager.exception.TaskNotFoundException;
import com.encora.taskmanager.exception.UserNotFoundException;
import com.encora.taskmanager.model.Task;
import com.encora.taskmanager.service.TaskService;
import com.encora.taskmanager.util.SecurityUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/task")
public class TaskController {
    private static final Logger log = LoggerFactory.getLogger(TaskController.class);
    private final TaskService taskService;
    private MessageSource messageSource;
    @Value("${app.locale}")
    private  String currentLocale="en";

    public TaskController(TaskService taskService, MessageSource messageSource) {
        this.taskService = taskService;
        this.messageSource = messageSource;
        System.out.println(currentLocale);
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
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    HttpStatus.UNAUTHORIZED.value(),
                    e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponseDto);
        } catch (InvalidJwtTokenException e) {
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDto);
        } catch (TaskNotFoundException e) { // Catch
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDto);
        } catch (Exception e) { // Catch general exceptions
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponseDto);
        }
    }
    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteTask(@PathVariable String id) {
        try {
            String userId = SecurityUtils.getUserIdFromJwt();
            SuccessfulResponse successfulResponse = taskService.deleteTask(id, userId);
            return ResponseEntity.ok(successfulResponse);
        } catch (UserNotFoundException e) {
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    HttpStatus.UNAUTHORIZED.value(),
                    e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(errorResponseDto);
        } catch (InvalidJwtTokenException e) {
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDto);
        } catch (TaskNotFoundException e) { // Catch
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    HttpStatus.BAD_REQUEST.value(),
                    e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(errorResponseDto);
        } catch (Exception e) { // Catch general exceptions
            ErrorResponseDto errorResponseDto = new ErrorResponseDto(
                    HttpStatus.INTERNAL_SERVER_ERROR.value(),
                    e.getMessage()
            );
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(errorResponseDto);
        }
    }
}
