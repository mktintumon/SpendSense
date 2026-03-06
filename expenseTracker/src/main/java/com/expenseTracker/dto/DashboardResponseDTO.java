package com.expenseTracker.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;
import java.util.Map;

@Data
@Builder
public class DashboardResponseDTO {

    private Map<String, Double> monthlyCategoryTotals;
    private Map<String, Double> topVendors;
    private List<ExpenseResponseDTO> anomalies;
}
