package com.resumeforge.service;

import com.resumeforge.dto.request.AuthRequest;
import com.resumeforge.dto.request.RegisterRequest;
import com.resumeforge.dto.response.AuthResponse;
import com.resumeforge.entity.User;
import com.resumeforge.exception.BadRequestException;
import com.resumeforge.repository.UserRepository;
import com.resumeforge.security.JwtTokenProvider;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
public class AuthService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManager authenticationManager;
    private final JwtTokenProvider tokenProvider;
    private final ActivityLogService activityLogService;

    public AuthService(UserRepository userRepository,
                       PasswordEncoder passwordEncoder,
                       AuthenticationManager authenticationManager,
                       JwtTokenProvider tokenProvider,
                       ActivityLogService activityLogService) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.authenticationManager = authenticationManager;
        this.tokenProvider = tokenProvider;
        this.activityLogService = activityLogService;
    }

    @Transactional
    public AuthResponse register(RegisterRequest request) {
        if (!request.getPassword().equals(request.getConfirmPassword())) {
            throw new BadRequestException("Passwords do not match");
        }

        if (userRepository.existsByEmail(request.getEmail().toLowerCase().trim())) {
            throw new BadRequestException("Email is already in use");
        }

        User user = new User();
        user.setFullName(request.getFullName().trim());
        user.setEmail(request.getEmail().toLowerCase().trim());
        user.setPassword(passwordEncoder.encode(request.getPassword()));
        user.setRole("ROLE_USER");

        User savedUser = userRepository.save(user);

        activityLogService.logActivity(savedUser, "USER_REGISTERED", "User account registered", "USER", savedUser.getId());

        String token = tokenProvider.generateTokenFromUser(savedUser.getId(), savedUser.getEmail(), savedUser.getFullName());
        return new AuthResponse(token, savedUser.getId(), savedUser.getFullName(), savedUser.getEmail(), savedUser.getRole());
    }

    public AuthResponse login(AuthRequest request) {
        Authentication authentication = authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                        request.getEmail().toLowerCase().trim(),
                        request.getPassword()
                )
        );

        SecurityContextHolder.getContext().setAuthentication(authentication);
        String token = tokenProvider.generateToken(authentication);

        User user = userRepository.findByEmail(request.getEmail().toLowerCase().trim())
                .orElseThrow(() -> new BadRequestException("User not found"));

        activityLogService.logActivity(user, "USER_LOGIN", "User logged in", "USER", user.getId());

        return new AuthResponse(token, user.getId(), user.getFullName(), user.getEmail(), user.getRole());
    }
}
