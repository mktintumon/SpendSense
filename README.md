# 🚀 SpendSense

**AI-Powered Expense Tracking & Financial Insights Platform**

SpendSense is a **full-stack expense analytics application** that helps users **track, categorize, and analyze their spending intelligently**.

The platform combines **rule-based logic with AI capabilities** to automatically categorize expenses, extract data from receipts, and generate meaningful financial insights.

It also includes **JWT-based authentication, interactive dashboards, anomaly detection, and AI-powered spending analysis.**

---

# ✨ Features

## 🔐 Authentication & Security

- JWT-based authentication
- Secure **HTTP-only cookie sessions**
- Protected React routes
- Global API error handling
- Authentication check endpoint

---

## 💰 Expense Management

- ➕ Add expenses manually
- ✏️ Edit existing expenses
- ❌ Delete expenses
- 🔍 Vendor-based expense search
- 📃 Server-side pagination for large datasets

---

## 📂 Bulk Upload

- Upload expenses using **CSV files**
- Automatic parsing and storage
- Validation and error handling

---

## 🧠 Smart Categorization

Rule-based vendor mapping automatically categorizes expenses.

Example:
Swiggy → Food
Uber → Travel
Amazon → Shopping


----

## 🤖 AI Features (Google Gemini)

SpendSense integrates **Google Gemini AI** to enhance financial analysis.

### 📷 Receipt Scanner

Upload receipt images (`jpeg / png`) and AI extracts:

- Vendor name
- Transaction amount
- Transaction date
- Description

Automatically populates the expense form.

---

### 🧠 AI Expense Categorization

AI analyzes:

- Vendor name
- Expense description

and suggests the most relevant category.

---

### 📊 AI Financial Insights

AI analyzes your expense history and generates insights like:

- Spending trends
- Overspending alerts
- Category-based recommendations

---

# 🛠 Tech Stack

```
## Backend
- Java
- Spring Boot
- Spring Security
- JWT Authentication
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
- Notistack (Snackbar Notifications)
- Recharts (Analytics Visualization)
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
Authentication Layer (JWT + Cookies)
│
Service Layer
│
AIService (Gemini Integration)
│
Spring Data JPA
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

## 👨‍💻 Author

Mohit Kumar

Frontend enthusiast passionate about building scalable full-stack applications.

---

⭐ If you found this project useful, consider giving it a star!
