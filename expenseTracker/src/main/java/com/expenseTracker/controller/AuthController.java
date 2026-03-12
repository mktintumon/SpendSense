package com.expenseTracker.controller;

import com.expenseTracker.dto.ApiResponse;
import com.expenseTracker.dto.AuthRequest;
import com.expenseTracker.service.AuthService;
import com.expenseTracker.util.JwtUtil;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
@CrossOrigin
public class AuthController {

    private final AuthService authService;
    private final JwtUtil jwtUtil;

    @PostMapping("/auth/register")
    public ResponseEntity<ApiResponse<String>> register(@Valid @RequestBody AuthRequest request){
        authService.register(request.getEmail(), request.getPassword());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "User registered successfully", null)
        );
    }


    @PostMapping("/auth/login")
    public ResponseEntity<ApiResponse<String>> login(
            @Valid AuthRequest authRequest,
            HttpServletResponse response
    ){
        boolean validData = authService.validate(
                authRequest.getEmail(),
                authRequest.getPassword()
        );

        if(!validData){
            return ResponseEntity.badRequest().body(
                    new ApiResponse<>(false, "Invalid credentials", null)
            );
        }

        String token = jwtUtil.generateToken(authRequest.getEmail());

        Cookie cookie = new Cookie("jwt" , token);
        cookie.setHttpOnly(true);
        cookie.setPath("/");
        cookie.setMaxAge(86400);

        response.addCookie(cookie);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Login successful", null)
        );
    }


    @PostMapping("/auth/logout")
    public ResponseEntity<ApiResponse<String>> logout(HttpServletResponse response) {
        Cookie cookie = new Cookie("jwt", "");
        cookie.setMaxAge(0);
        cookie.setPath("/");

        response.addCookie(cookie);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Logged out successfully", null)
        );
    }
}
