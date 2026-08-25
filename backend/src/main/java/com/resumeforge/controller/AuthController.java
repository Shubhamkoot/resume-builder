package com.resumeforge.controller;

import com.resumeforge.dto.request.AuthRequest;
import com.resumeforge.dto.request.RegisterRequest;
import com.resumeforge.dto.response.ApiResponse;
import com.resumeforge.dto.response.AuthResponse;
import com.resumeforge.security.UserPrincipal;
import com.resumeforge.service.AuthService;
import jakarta.validation.Valid;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final AuthService authService;

    public AuthController(AuthService authService) {
        this.authService = authService;
    }

    @PostMapping("/register")
    public ResponseEntity<ApiResponse<AuthResponse>> register(@Valid @RequestBody RegisterRequest request) {
        AuthResponse response = authService.register(request);
        return ResponseEntity.ok(ApiResponse.success("Registration successful", response));
    }

    @PostMapping("/login")
    public ResponseEntity<ApiResponse<AuthResponse>> login(@Valid @RequestBody AuthRequest request) {
        AuthResponse response = authService.login(request);
        return ResponseEntity.ok(ApiResponse.success("Login successful", response));
    }

    @PostMapping("/logout")
    public ResponseEntity<ApiResponse<String>> logout() {
        return ResponseEntity.ok(ApiResponse.success("Logged out successfully", "Session cleared"));
    }

    @GetMapping("/me")
    public ResponseEntity<ApiResponse<AuthResponse>> getCurrentUser(@AuthenticationPrincipal UserPrincipal principal) {
        if (principal == null) {
            return ResponseEntity.status(401).body(ApiResponse.error("Not authenticated"));
        }
        AuthResponse resp = new AuthResponse(null, principal.getId(), principal.getFullName(), principal.getEmail(), "ROLE_USER");
        return ResponseEntity.ok(ApiResponse.success(resp));
    }
}
