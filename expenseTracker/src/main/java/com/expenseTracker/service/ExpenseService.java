package com.expenseTracker.service;

import com.expenseTracker.dto.ExpenseRequestDTO;
import com.expenseTracker.dto.ExpenseResponseDTO;
import com.expenseTracker.exception.ResourceNotFoundException;
import com.expenseTracker.model.Expense;
import com.expenseTracker.model.VendorRule;
import com.expenseTracker.repository.ExpenseRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.*;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ExpenseService {

    private final ExpenseRepository expenseRepository;
    private final RuleService ruleService;
    private final AnomalyService anomalyService;
    private final AIService aiService;


    // Paginated API
    public Page<ExpenseResponseDTO> getExpenses(
            int page, int size, String search, String sortBy, String sortDir
    ){
        Sort sort = sortDir.equalsIgnoreCase("desc")
                    ? Sort.by(sortBy).descending()
                    : Sort.by(sortBy).ascending();

        Pageable pageable = PageRequest.of(page, size, sort);

        Page<Expense> expensePage;

        if(search != null && !search.isEmpty()){
            expensePage = expenseRepository.findByVendorContainingIgnoreCase(search,pageable);
        }
        else{
            expensePage = expenseRepository.findAll(pageable);
        }

        return expensePage.map(this::mapToDTO);
    }

    public List<ExpenseResponseDTO> getAllExpenses(){
        return expenseRepository.findAll()
                .stream()
                .map(this::mapToDTO)
                .toList();
    }

    public ExpenseResponseDTO addExpense(ExpenseRequestDTO dto){

        /* NOT USING as all rules loaded from DB and matching happens in java - CategoryMatcher.java
        List<VendorRule> rules = ruleService.getAllRules();
        String category = CategoryMatcher.matchCategory(expenseRequestDTO.getVendor(),rules);
        */

        // USING this ---> Ask DB → find rule where vendor LIKE keyword
        VendorRule rule = ruleService.getRule(dto.getVendor());
        String category;

        if(rule != null){
            category = rule.getCategory();
        }
        else{
            try {
                category = aiService.categorizeExpense(
                        dto.getVendor(),
                        dto.getDescription()
                );
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        Expense expense = Expense.builder()
                .date(dto.getDate())
                .amount(dto.getAmount())
                .vendor(dto.getVendor())
                .description(dto.getDescription())
                .category(category)
                .build();

        boolean anomaly = anomalyService.checkAnomaly(expense);
        expense.setAnomaly(anomaly);

        expenseRepository.save(expense);

        return mapToDTO(expense);
    }

    public void deleteExpense(Long expenseId){
        Expense expense = expenseRepository.findById(expenseId)
                .orElseThrow(()->new ResourceNotFoundException("Expense not found with id: " + expenseId));

        expenseRepository.delete(expense);
    }

    public ExpenseResponseDTO updateExpense(Long id, ExpenseRequestDTO dto){
        Expense expense = expenseRepository.findById(id)
                .orElseThrow(()->new ResourceNotFoundException("Expense not found with id : " + id));

        // updating fields
        expense.setDate(dto.getDate());
        expense.setAmount(dto.getAmount());
        expense.setVendor(dto.getVendor());
        expense.setDescription(dto.getDescription());

        // Re-assign category
        // USING this ---> Ask DB → find rule where vendor LIKE keyword
        VendorRule rule = ruleService.getRule(dto.getVendor());
        String category;

        if(rule != null){
            category = rule.getCategory();
        }
        else{
            try {
                category = aiService.categorizeExpense(
                        dto.getVendor(),
                        dto.getDescription()
                );
            } catch (Exception e) {
                throw new RuntimeException(e);
            }
        }

        expense.setCategory(category);

        // Re-calculate anomaly
        boolean anomaly = anomalyService.checkAnomaly(expense);
        expense.setAnomaly(anomaly);

        expenseRepository.save(expense);

        return mapToDTO(expense);
    }

    private ExpenseResponseDTO mapToDTO(Expense e) {
        return ExpenseResponseDTO.builder()
                .id(e.getId())
                .date(e.getDate())
                .amount(e.getAmount())
                .vendor(e.getVendor())
                .description(e.getDescription())
                .category(e.getCategory())
                .anomaly(e.isAnomaly())
                .build();
    }
}
