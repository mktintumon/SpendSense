package com.expenseTracker.dto;

import lombok.Builder;
import lombok.Data;
import java.time.LocalDate;

@Data
@Builder
public class ExpenseResponseDTO {
    private Long id;
    private LocalDate date;
    private Double amount;
    private String vendor;
    private String description;
    private String category;
    private boolean anomaly;
}
