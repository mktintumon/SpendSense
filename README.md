# 🚀 SpendSense

**AI-Powered Expense Tracking with Smart Categorization & Financial Insights**

SpendSense is a full-stack expense analytics platform that helps users track, categorize, and analyze their spending.  
It combines **rule-based logic with AI capabilities** to automatically categorize expenses, extract receipt information, and generate financial insights.

The system supports **CSV uploads, receipt scanning, anomaly detection, and an interactive analytics dashboard**.

---

# ✨ Features

### Core Features

- ➕ Add, edit, and delete expenses
- 📂 Upload expenses via CSV
- 🧠 Rule-based vendor categorization
- 🚨 Automatic anomaly detection (expense > 3× category average)
- 📊 Dashboard with monthly analytics
- 🏆 Top vendor spending insights
- 📃 Server-side pagination
- 🔍 Expense filtering & vendor search
- ⚠️ Global exception handling
- 📚 REST APIs with Swagger documentation

---

# 🤖 AI Features

SpendSense integrates **Google Gemini AI** to enhance expense analysis.

### 📷 Receipt Scanning
Upload a receipt image and AI will extract:
- Vendor name
- Total amount
- Transaction date
- Description

### 🧠 Smart Expense Categorization
AI suggests the correct category using:
- Vendor name
- Expense description

### 📊 AI Financial Insights
AI analyzes spending patterns and generates insights like:
- Spending trends
- Overspending warnings
- Category-based suggestions

---

# 🛠 Tech Stack

```
## Backend
- Java
- Spring Boot
- Spring Data JPA
- MySQL
- WebClient
- Google Gemini API
- Swagger (OpenAPI)
- Lombok

## Frontend
- React
- TypeScript
- Material UI
- Axios
```
---

## 🏗 System Architecture

```
React (UI)
│
Axios API Layer
│
Spring Boot REST APIs
│
Service Layer
│
AIService (Gemini Integration)
│
JPA Repository
│
MySQL Database
```

---


## ▶ Running the Project

### Backend

```
cd backend
mvn spring-boot:run
```

Backend runs at:

```
http://localhost:8081
```

---

### Frontend

```
cd frontend
npm install
npm run dev
```

Frontend runs at:

```
http://localhost:5173
```

---

## 📖 API Documentation

Swagger UI:

```
http://localhost:8081/swagger-ui/index.html
```

---

## 🔍 Example Expense JSON

```
{
  "date": "2026-03-01",
  "amount": 250,
  "vendor": "Swiggy",
  "description": "Dinner order"
}
```
---

## Environment Configuration

# Add your Gemini API configuration in application.properties.

* gemini.api.URL=https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key={KEY}
* gemini.api.API_KEY=YOUR_API_KEY

---

## 📊 Dashboard Insights

SpendSense dashboard provides:

* Monthly category spending totals
* Top 5 vendors by spend
* Anomaly detection alerts
* Category-wise analytics
* AI-generated financial insights


---

## 👨‍💻 Author

Mohit Kumar

Frontend enthusiast passionate about building scalable full-stack applications.

---

⭐ If you found this project useful, consider giving it a star!
