package com.expenseTracker.service;

import com.expenseTracker.dto.ExpenseRequestDTO;
import com.opencsv.CSVReader;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStreamReader;
import java.time.LocalDate;

@Service
@RequiredArgsConstructor
public class CsvService {

    private final ExpenseService expenseService;

    public void uploadCSV(MultipartFile file) throws Exception{
        CSVReader csvReader = new CSVReader(new InputStreamReader(file.getInputStream()));
        String[] line;

        csvReader.readNext(); // header skipping

        while((line = csvReader.readNext()) != null){
            ExpenseRequestDTO dto = new ExpenseRequestDTO();
            dto.setDate(LocalDate.parse(line[0]));
            dto.setAmount(Double.parseDouble(line[1]));
            dto.setVendor(line[2]);
            dto.setDescription(line[3]);

            expenseService.addExpense(dto);
        }
    }
}
