package com.encora.taskmanager.service;

import com.encora.taskmanager.dto.LoginRequestDto;
import com.encora.taskmanager.exception.UserNotFoundException;
import com.encora.taskmanager.model.User;
import com.encora.taskmanager.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Locale;
import java.util.Optional;


@Service
public class AuthenticationService {
    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    @Value("${app.locale}")
    private String currentLocale;

    @Autowired
    private MessageSource messageSource;

    public AuthenticationService(
            UserRepository userRepository,
            AuthenticationManager authenticationManager,
            PasswordEncoder passwordEncoder
    ) {
        this.authenticationManager = authenticationManager;
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
    }


    public User authenticate(LoginRequestDto input) {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(
                            input.getEmail(),
                            input.getPassword()
                    )
            );

            // Get the Optional<User> from the repository
            Optional<User> optionalUser = userRepository.findByEmail(input.getEmail());

            // Check if the user exists
            if (optionalUser.isPresent()) {
                // Get the User object from the Optional
                User user = optionalUser.get();

                // Authentication successful, retrieve the user
                return user;
            } else {
                // User not found, throw an exception
                throw new UsernameNotFoundException("User not found with email: " + input.getEmail());
            }
        } catch (AuthenticationException e) {
            // Authentication failed, throw an exception
            throw new UserNotFoundException(messageSource.getMessage(
                    "user.not.found",
                    null,
                    Locale.forLanguageTag(currentLocale)));
        }
    }
}