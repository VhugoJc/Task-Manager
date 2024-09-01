package com.encora.taskmanager.exception;

import com.encora.taskmanager.dto.ErrorResponseDto;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(UserNotFoundException.class)
    @ResponseStatus(HttpStatus.NOT_FOUND) // Set the response status code
    @ResponseBody // Indicate that the returned object is the response body
    public ErrorResponseDto handleUserNotFoundException(UserNotFoundException ex) {
        // Create and return the error response DTO
        return new ErrorResponseDto(HttpStatus.NOT_FOUND.value(), ex.getMessage());
    }

    @ExceptionHandler(InvalidJwtTokenException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST) // 400 Bad Request for invalid token
    @ResponseBody
    public ErrorResponseDto handleInvalidJwtTokenException(InvalidJwtTokenException ex) {
        return new ErrorResponseDto(HttpStatus.BAD_REQUEST.value(), ex.getMessage());
    }
}
