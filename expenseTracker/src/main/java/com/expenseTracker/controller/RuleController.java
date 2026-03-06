package com.expenseTracker.controller;

import com.expenseTracker.dto.ApiResponse;
import com.expenseTracker.model.VendorRule;
import com.expenseTracker.service.RuleService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
@CrossOrigin
public class RuleController {
    private final RuleService ruleService;

    @PostMapping("/addRule")
    public ResponseEntity<ApiResponse<VendorRule>> addRule(@Valid @RequestBody VendorRule rule){
        VendorRule savedRule =  ruleService.addRule(rule);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Rule added successfully", savedRule)
        );
    }

    @GetMapping("/rules")
    public ResponseEntity<ApiResponse<List<VendorRule>>> getAllRules(){
        List<VendorRule> allRules =  ruleService.getAllRules();

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Rules fetched successfully", allRules)
        );
    }

    @DeleteMapping("/deleteRule/{ruleId}")
    public ResponseEntity<ApiResponse<String>> deleteRule(@PathVariable Long ruleId) {

        ruleService.deleteRule(ruleId);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Rule deleted successfully", null)
        );
    }


    @PutMapping("/updateRule/{ruleId}")
    public ResponseEntity<ApiResponse<VendorRule>> updateRule(
            @PathVariable Long ruleId,
            @Valid @RequestBody VendorRule rule) {

        VendorRule updatedRule = ruleService.updateRule(ruleId, rule);

        return ResponseEntity.ok(
                new ApiResponse<>(true, "Rule updated successfully", updatedRule)
        );
    }
}
