package com.expenseTracker.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import java.time.LocalDate;

@Data
public class ExpenseRequestDTO {
    @NotNull(message = "Date is required")
    private LocalDate date;

    @NotNull(message = "Amount is required")
    @Positive(message = "Amount must be positive")
    private Double amount;

    @NotBlank(message = "Vendor name is required")
    private String vendor;

    @NotBlank(message = "Vendor name is required")
    private String description;
}
