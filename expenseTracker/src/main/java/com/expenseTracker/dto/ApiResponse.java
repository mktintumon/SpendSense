package com.expenseTracker.dto;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class ApiResponse<T> {
    private boolean success;
    private String message;
    private T data;
}

/*
{
  "success": true,
  "message": "Expense fetched successfully",
  "data": [...]
}

{
  "success": false,
  "message": "Expense not found",
  "data": null
}
 */
