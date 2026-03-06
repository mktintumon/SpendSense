package com.expenseTracker.service;

import com.expenseTracker.model.Expense;
import com.expenseTracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class AnomalyService {

    private final ExpenseRepository expenseRepository;

    public boolean checkAnomaly(Expense expense){
        /*
        List<Expense> categoryExpense = expenseRepository.findByCategory(expense.getCategory());

        if(categoryExpense.isEmpty()) return false;

        double avg = categoryExpense.stream()
                .mapToDouble(Expense::getAmount)
                .average()
                .orElse(0);

        return expense.getAmount() > 3 * avg;
         */

        // OPTIMIZED SOLUTION - DB calculates AVG(amount) where anomaly=false -> o(1)
        Double avg = expenseRepository.getAverageAmountByCategory(expense.getCategory());
        Long count = expenseRepository.countNonAnomalyByCategory(expense.getCategory());

        if(avg == null || count < 3){
            return false; // not enough data, skip anomaly detection
        }

        return expense.getAmount() > 3 * avg;
    }
}
