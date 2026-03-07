package com.expenseTracker.controller;

import com.expenseTracker.dto.ApiResponse;
import com.expenseTracker.dto.ExpenseRequestDTO;
import com.expenseTracker.dto.ExpenseResponseDTO;
import com.expenseTracker.service.CsvService;
import com.expenseTracker.service.ExpenseService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin
public class ExpenseController {
    private final ExpenseService expenseService;
    private final CsvService csvService;

    @GetMapping("/expenses")
    public ResponseEntity<ApiResponse<List<ExpenseResponseDTO>>> getAllExpenses(){
        List<ExpenseResponseDTO> expenses = expenseService.getAllExpenses();

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Expenses fetched successfully", expenses)
        );
    }

    @GetMapping("/getExpenses")
    public ResponseEntity<ApiResponse<Page<ExpenseResponseDTO>>> getExpenses(
            @RequestParam(defaultValue = "0") int page,
            @RequestParam(defaultValue = "10") int size,
            @RequestParam(defaultValue = "") String search,
            @RequestParam(defaultValue = "date") String sortBy,
            @RequestParam(defaultValue = "desc") String sortDir
    ){
        Page<ExpenseResponseDTO> expenses = expenseService.getExpenses(page,size,search,sortBy,sortDir);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Expense Added successfully" , expenses)
        );
    }

    @PostMapping("/addExpense")
    public ResponseEntity<ApiResponse<ExpenseResponseDTO>> addExpense(@Valid @RequestBody ExpenseRequestDTO dto){
        ExpenseResponseDTO expense = expenseService.addExpense(dto);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Expense Added successfully" , expense)
        );
    }

    @PostMapping("/upload")
    public ResponseEntity<ApiResponse<String>> uploadCSV(@RequestParam MultipartFile file) throws  Exception {
        csvService.uploadCSV(file);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "CSV uploaded successfully" , null)
        );
    }

    @DeleteMapping("/deleteExpense/{id}")
    public ResponseEntity<ApiResponse<String>> deleteExpense(@PathVariable Long id) {
        expenseService.deleteExpense(id);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Expense deleted successfully" , null)
        );
    }

    @PutMapping("/updateExpense/{id}")
    public ResponseEntity<ApiResponse<ExpenseResponseDTO>> updateExpense(@PathVariable Long id, @Valid @RequestBody ExpenseRequestDTO dto){
        ExpenseResponseDTO response = expenseService.updateExpense(id,dto);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Expense updated successfully", response)
        );
    }
}
