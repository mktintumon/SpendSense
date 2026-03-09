package com.expenseTracker.service;

import com.expenseTracker.dto.ExpenseInsightDTO;
import com.expenseTracker.dto.ReceiptDTO;
import com.expenseTracker.exception.AIException;
import com.expenseTracker.model.Expense;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import org.springframework.web.reactive.function.client.WebClient;


import java.io.IOException;
import java.nio.charset.StandardCharsets;
import java.util.Base64;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@RequiredArgsConstructor
public class AIService {

    @Value("${gemini.api.URL}")
    private String geminiUrl;

    @Value("${gemini.api.API_KEY}")
    private String apiKey;

    @Value("classpath:prompts/scan-receipt.txt")
    private Resource scanReceiptResource;

    @Value("classpath:prompts/categorize-expense.txt")
    private Resource categorizeExpenseResource;

    @Value("classpath:prompts/financial-insights.txt")
    private Resource financialInsightsResource;

    // --- Cached Prompt Strings ---
    private String scanReceiptPrompt;
    private String categorizeExpensePrompt;
    private String financialInsightsPrompt;

    private final WebClient webClient = WebClient.create();
    private final ObjectMapper objectMapper;

    @PostConstruct
    public void initPrompts() throws IOException {
        // Read files into memory once at startup rather than on every request
        scanReceiptPrompt = new String(scanReceiptResource.getContentAsByteArray(), StandardCharsets.UTF_8);
        categorizeExpensePrompt = new String(categorizeExpenseResource.getContentAsByteArray(), StandardCharsets.UTF_8);
        financialInsightsPrompt = new String(financialInsightsResource.getContentAsByteArray(), StandardCharsets.UTF_8);
    }


    public ReceiptDTO scanReceipt(byte[] imageBytes) throws Exception {
        String base64Image = Base64.getEncoder().encodeToString(imageBytes);

        String prompt = scanReceiptPrompt;

        List<Map<String, Object>> parts = List.of(
                Map.of("text", prompt),
                Map.of("inline_data",
                        Map.of(
                        "mime_type", "image/jpeg",
                        "data", base64Image
                ))
        );

        String responseText = executeGeminiRequest(parts);

        try {
            return objectMapper.readValue(responseText, ReceiptDTO.class);
        } catch (Exception e) {
            throw new AIException("AI returned invalid JSON: " + responseText);
        }
    }

    public String categorizeExpense(String vendor, String description) throws Exception {
        String prompt = categorizeExpensePrompt.formatted(vendor, description);

        List<Map<String, Object>> parts = List.of(Map.of("text", prompt));

        return executeGeminiRequest(parts).trim();
    }

    public String generateFinancialInsights(List<Expense> expenses) throws Exception {

        List<ExpenseInsightDTO> data = expenses.stream()
                .map(e -> new ExpenseInsightDTO(
                        e.getCategory(),
                        e.getAmount(),
                        e.getVendor()
                ))
                .toList();

        String expenseJson = objectMapper.writeValueAsString(data);

        String prompt = financialInsightsPrompt +  expenseJson;

        List<Map<String, Object>> parts = List.of(Map.of("text", prompt));

        return executeGeminiRequest(parts).trim();
    }


    private String executeGeminiRequest(List<Map<String, Object>> parts) {

        try {
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("contents", List.of(Map.of("parts", parts)));

            String url = geminiUrl + apiKey;

            String response = webClient.post()
                    .uri(url)
                    .bodyValue(requestBody)
                    .retrieve()
                    .bodyToMono(String.class)
                    .block();

            JsonNode root = objectMapper.readTree(response);

            return root.path("candidates")
                    .get(0)
                    .path("content")
                    .path("parts")
                    .get(0)
                    .path("text")
                    .asText();

        } catch (Exception e) {
            throw new AIException("Error while calling Gemini API", e);
        }
    }
}