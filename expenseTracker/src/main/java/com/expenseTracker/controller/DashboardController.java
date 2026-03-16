package com.expenseTracker.controller;


import com.expenseTracker.dto.ApiResponse;
import com.expenseTracker.dto.DashboardResponseDTO;
import com.expenseTracker.model.Expense;
import com.expenseTracker.repository.ExpenseRepository;
import com.expenseTracker.service.AIService;
import com.expenseTracker.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin
public class DashboardController {

    private final DashboardService dashboardService;

    @GetMapping("/dashboard")
    public ResponseEntity<ApiResponse<DashboardResponseDTO>> getDashboard(@RequestParam int month, @RequestParam int year){
        DashboardResponseDTO dashboard =  dashboardService.getDashboard(month, year);
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Dashboard fetched successfully", dashboard)
        );
    }

    @GetMapping("/insights")
    public ResponseEntity<ApiResponse<String>> getInsights() throws Exception {

        String response = dashboardService.generateInsights();
        return ResponseEntity.ok(
                new ApiResponse<>(true, "Insights fetched successfully", response)
        );
    }
}
