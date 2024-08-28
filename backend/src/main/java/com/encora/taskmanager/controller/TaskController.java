package com.encora.taskmanager.controller;

import com.encora.taskmanager.service.TaskServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class TaskController {
    @Autowired
    private TaskServiceImpl taskService;


    @GetMapping("/")
    public String getHelloWorld(){
        return taskService.getHelloWorld();
    }
}
