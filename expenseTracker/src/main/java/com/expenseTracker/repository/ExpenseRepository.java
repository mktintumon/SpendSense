package com.expenseTracker.repository;

import com.expenseTracker.model.Expense;
import org.springframework.data.domain.*;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ExpenseRepository extends JpaRepository<Expense,Long> {

    // This allows search vendor, pagination and sorting
    Page<Expense> findByVendorContainingIgnoreCase(String vendor, Pageable pageable);

    @Query("SELECT exp from Expense exp where MONTH(exp.date)=?1 AND YEAR(exp.date)=?2")
    List<Expense> findByMonth(int month, int year);

    @Query("""
            SELECT AVG(e.amount) FROM Expense e
            WHERE e.category = :category
            AND e.anomaly = false
            """)
    Double getAverageAmountByCategory(String category);

    @Query("""
            SELECT count(e) FROM Expense e
            WHERE e.category = :category
            AND e.anomaly = false
            """)
    Long countNonAnomalyByCategory(String category);

}
