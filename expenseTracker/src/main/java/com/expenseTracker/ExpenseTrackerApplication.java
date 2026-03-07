package com.expenseTracker;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
public class ExpenseTrackerApplication {

	// SWAGGER --> http://localhost:8081/swagger-ui/index.html
	public static void main(String[] args) {
		SpringApplication.run(ExpenseTrackerApplication.class, args);
	}

}

/*
1. AI-Powered Receipt Scanner (OCR + Data Extraction)
Instead of forcing users to manually type in their expenses or upload CSVs, allow them to upload a photo of a receipt.

How it works: The user uploads an image from the React frontend. Your Spring Boot backend sends the image to a multimodal LLM (like Gemini 1.5 Flash or OpenAI's GPT-4o). You prompt the AI to extract the vendor, date, amount, and category, and return it strictly as a JSON object.

Resume Flex: "Built an automated data entry pipeline using Vision AI to extract structured financial data from unstructured receipt images."


2. "Zero-Shot" AI Categorization (Replacing Rules)
Rule-based categorization is great, but it breaks down when a user visits a new, unknown vendor (e.g., "Bob's Corner Store").

How it works: Keep your rule-based system for speed. However, if an expense doesn't match any rules, use an LLM as a fallback. Send the vendor name and transaction description to the API and ask it to classify the expense into one of your predefined categories (e.g., Food, Transport, Utilities).

Resume Flex: "Implemented a hybrid categorization engine, utilizing rule-based logic for high-speed processing and Zero-Shot LLM classification for dynamic fallback and edge cases."
*/
