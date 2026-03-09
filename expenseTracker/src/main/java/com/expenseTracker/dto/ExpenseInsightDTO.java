package com.expenseTracker.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class ExpenseInsightDTO {
    private String category;
    private Double amount;
    private String vendor;
}
