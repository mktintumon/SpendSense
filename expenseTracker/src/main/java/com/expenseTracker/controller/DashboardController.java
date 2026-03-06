package com.expenseTracker.controller;


import com.expenseTracker.dto.ApiResponse;
import com.expenseTracker.dto.DashboardResponseDTO;
import com.expenseTracker.service.DashboardService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

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
}
