package com.expenseTracker.controller;

import com.expenseTracker.dto.ApiResponse;
import com.expenseTracker.dto.ReceiptDTO;
import com.expenseTracker.service.AIService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin
public class ReceiptController {

    private final AIService aiService;

    @PostMapping("/scanReceipt")
    public ResponseEntity<ApiResponse<ReceiptDTO>> scanReceipt(@RequestParam MultipartFile file) throws Exception {

        ReceiptDTO response = aiService.scanReceipt(file.getBytes());

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Receipt data extracted successfully", response)
        );
    }

}