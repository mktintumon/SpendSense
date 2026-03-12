package com.expenseTracker.service;

import com.expenseTracker.model.User;
import com.expenseTracker.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class AuthService {
    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

    public void register(String email, String password){
        User user = new User();
        user.setEmail(email);
        user.setPassword(passwordEncoder.encode(password));

        userRepository.save(user);
    }

    public boolean validate(String email, String password){
        User user = userRepository.findByEmail(email).orElse(null);

        if(user == null) return false;

        return passwordEncoder.matches(password, user.getPassword());
    }
}
