package com.encora.taskmanager.controller;

import com.encora.taskmanager.config.JwtUtil;
import com.encora.taskmanager.dto.LoginRequest;
import com.encora.taskmanager.dto.LoginResponse;
import com.encora.taskmanager.model.User;
import com.encora.taskmanager.service.AuthenticationService;
import com.encora.taskmanager.service.UserDetailsServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/auth")
public class AuthController { private final AuthenticationManager authenticationManager;
    private final JwtUtil jwtTokenUtil;
    private final UserDetailsServiceImpl userDetailsService;
    private final AuthenticationService authenticationService;

    @Autowired
    public AuthController(AuthenticationManager authenticationManager, JwtUtil jwtTokenUtil, UserDetailsServiceImpl userDetailsService, AuthenticationService authenticationService) {
        this.authenticationManager = authenticationManager;
        this.jwtTokenUtil = jwtTokenUtil;
        this.userDetailsService = userDetailsService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> authenticate(@RequestBody LoginRequest loginUserDto) {
        User authenticatedUser = authenticationService.authenticate(loginUserDto);
        String jwtToken = jwtTokenUtil.generateToken(authenticatedUser);
        LoginResponse loginResponse = new LoginResponse(jwtToken);
        return ResponseEntity.ok(loginResponse);
    }

}