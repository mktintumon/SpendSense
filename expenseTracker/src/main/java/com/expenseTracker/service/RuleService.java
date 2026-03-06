package com.expenseTracker.service;

import com.expenseTracker.exception.ResourceNotFoundException;
import com.expenseTracker.model.VendorRule;
import com.expenseTracker.repository.RuleRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RuleService {

    private final RuleRepository ruleRepository;

    public VendorRule addRule(VendorRule rule){
        return ruleRepository.save(rule);
    }

    public VendorRule getRule(String vendor){
        return ruleRepository.findMatchingRule(vendor).orElse(null);
    }

    public List<VendorRule> getAllRules(){
        return ruleRepository.findAll();
    }

    public void deleteRule(Long ruleId){

        VendorRule rule = ruleRepository.findById(ruleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Rule not found with id: " + ruleId));

        ruleRepository.delete(rule);
    }

    public VendorRule updateRule(Long ruleId, VendorRule updatedRule){
        VendorRule rule = ruleRepository.findById(ruleId)
                .orElseThrow(() ->
                        new ResourceNotFoundException("Rule not found with id: " + ruleId));

        rule.setVendorKeyword(updatedRule.getVendorKeyword());
        rule.setCategory(updatedRule.getCategory());

        return  ruleRepository.save(rule);
    }
}
