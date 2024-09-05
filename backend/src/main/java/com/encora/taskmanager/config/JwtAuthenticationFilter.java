package com.encora.taskmanager.config;

import com.encora.taskmanager.dto.ErrorResponseDto;
import com.encora.taskmanager.exception.InvalidJwtTokenException;
import com.encora.taskmanager.service.UserDetailsServiceImpl;
import com.fasterxml.jackson.databind.ObjectMapper;
import io.jsonwebtoken.Claims;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.MessageSource;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.stereotype.Component;
import org.springframework.util.StringUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Component
public class JwtAuthenticationFilter extends OncePerRequestFilter {
    @Value("${app.locale}")
    private  String currentLocale;
    private  MessageSource messageSource;
    private final JwtUtil jwtUtil;
    private final UserDetailsServiceImpl userDetailsServiceImpl;

    public JwtAuthenticationFilter(JwtUtil jwtUtil, UserDetailsServiceImpl userDetailsServiceImpl, MessageSource messageSource) {
        this.jwtUtil = jwtUtil;
        this.userDetailsServiceImpl = userDetailsServiceImpl;
        this.messageSource =  messageSource;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain)
            throws ServletException, IOException {
        try {
            String jwt = getJwtFromRequest(request);

            if (StringUtils.hasText(jwt)) {
                String username = jwtUtil.getUsernameFromToken(jwt); // Get username from token
                UserDetails userDetails = userDetailsServiceImpl.loadUserByUsername(username); // Load UserDetails
                if (jwtUtil.validateToken(jwt, userDetails)) { // Validate with UserDetails
                    Claims claims = jwtUtil.getClaimsFromToken(jwt);
                    List<String> authorities = (List<String>) claims.get("authorities");

                    UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                            userDetails, null, authorities.stream().map(SimpleGrantedAuthority::new).collect(Collectors.toList()));
                    authentication.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

                    SecurityContextHolder.getContext().setAuthentication(authentication);
                }
            }
        } catch (InvalidJwtTokenException ex) {
            // Create ErrorResponseDto
            ErrorResponseDto errorResponse = new ErrorResponseDto(
                    HttpStatus.UNAUTHORIZED.value(),
                    messageSource.getMessage(
                            "jwt.token.invalid",
                            null,
                            Locale.forLanguageTag(currentLocale))
            );

            // Set response details
            response.setStatus(HttpServletResponse.SC_UNAUTHORIZED);
            response.setContentType(MediaType.APPLICATION_JSON_VALUE);

            // Use ObjectMapper to write the error response as JSON
            new ObjectMapper().writeValue(response.getOutputStream(), errorResponse);

            return; // Stop further processing

        }

        filterChain.doFilter(request, response);
    }

    private String getJwtFromRequest(HttpServletRequest request) {
        String header = request.getHeader("Authorization");

        if (StringUtils.hasText(header) && header.startsWith("Bearer ")) {
            return header.substring(7);
        }

        return null;
    }
}