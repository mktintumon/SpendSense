package com.expenseTracker.repository;

import com.expenseTracker.model.VendorRule;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RuleRepository extends JpaRepository<VendorRule,Long> {
    @Query("""
            SELECT r from VendorRule r
            WHERE LOWER(:vendor) LIKE CONCAT('%',LOWER(r.vendorKeyword),'%')
            """)
    Optional<VendorRule> findMatchingRule(String vendor);
}
