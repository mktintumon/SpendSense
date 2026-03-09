package com.expenseTracker.dto;

import lombok.*;

@Getter
@Setter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ReceiptDTO {
    private String vendor;
    private String date;
    private Double amount;
    private String description;
}
