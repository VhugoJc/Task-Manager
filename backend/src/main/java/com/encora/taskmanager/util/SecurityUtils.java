package com.encora.taskmanager.util;

import com.encora.taskmanager.exception.InvalidJwtTokenException;
import com.encora.taskmanager.exception.UserNotFoundException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Locale;


public class SecurityUtils {
    @Value("${app.locale}")
    private static String currentLocale;
    private static MessageSource messageSource;

    public SecurityUtils(MessageSource messageSource) {
        this.messageSource = messageSource;
    }

    public static String getUserIdFromJwt() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null || !authentication.isAuthenticated()) {
            throw new UserNotFoundException(messageSource.getMessage(
                    "user.not.authorized",
                    null,
                    Locale.forLanguageTag(currentLocale)));
        }
        Object principal = authentication.getPrincipal();
        if (principal instanceof UserDetails) { // Check if principal is UserDetails
            return ((UserDetails) principal).getUsername(); // Get username from UserDetails
        } else {
            throw new InvalidJwtTokenException(messageSource.getMessage(
                    "jwt.token.invalid",
                    null,
                    Locale.forLanguageTag(currentLocale)));
        }
    }
}