package com.expenseTracker.service;

import com.expenseTracker.dto.DashboardResponseDTO;
import com.expenseTracker.dto.ExpenseResponseDTO;
import com.expenseTracker.model.Expense;
import com.expenseTracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DashboardService {
    private final ExpenseRepository expenseRepository;

    public DashboardResponseDTO getDashboard(int month, int year){
        List<Expense> expenseList = expenseRepository.findByMonth(month,year);

        // getting (category -> totalAmount)
        Map<String, Double> monthlyCategoryTotals = expenseList.stream()
                .collect(Collectors.groupingBy(
                        Expense::getCategory,
                        Collectors.summingDouble(Expense::getAmount)
                ));


        // getting (vendor -> totalAmount)
        Map<String, Double> vendorTotals = expenseList.stream()
                .collect(Collectors.groupingBy(
                        Expense::getVendor,
                        Collectors.summingDouble(Expense::getAmount)
                ));


        // getting top 5 vendors based on amount
        Map<String, Double> topVendors = vendorTotals.entrySet().stream()
                .sorted(Map.Entry.<String, Double>comparingByValue().reversed())
                .limit(5)
                .collect(Collectors.toMap(
                        Map.Entry::getKey,
                        Map.Entry::getValue
                ));


        // getting anomalies based on anomaly column in DB
        List<ExpenseResponseDTO> anomalies = expenseList.stream()
                .filter(Expense::isAnomaly)
                .map(e -> ExpenseResponseDTO.builder()
                        .id(e.getId())
                        .date(e.getDate())
                        .amount(e.getAmount())
                        .vendor(e.getVendor())
                        .description(e.getDescription())
                        .category(e.getCategory())
                        .anomaly(true)
                        .build()
                )
                .toList();


        return DashboardResponseDTO.builder()
                .monthlyCategoryTotals(monthlyCategoryTotals)
                .topVendors(topVendors)
                .anomalies(anomalies)
                .build();
    }
}
