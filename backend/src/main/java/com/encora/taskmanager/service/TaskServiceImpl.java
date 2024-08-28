package com.encora.taskmanager.service;

import org.springframework.stereotype.Service;

@Service
public class TaskServiceImpl implements TaskService{
    @Override
    public String getHelloWorld() {
        return "Hello World from service";
    }
}
