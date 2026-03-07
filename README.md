# 🚀 SpendSense

**Smart Expense Tracking with Rule-Based Categorization & Anomaly Detection**

SpendSense is a full-stack expense analytics platform that helps users track, categorize, and analyze their spending.
It supports rule-based vendor categorization, anomaly detection for unusual expenses, CSV uploads, and an interactive dashboard for financial insights.

---

## ✨ Features

* ➕ Add, edit, and delete expenses
* 📂 Upload expenses via CSV
* 🧠 Rule-based vendor categorization
* 🚨 Automatic anomaly detection (expense > 3× category average)
* 📊 Dashboard with monthly analytics
* 🏆 Top vendor spending insights
* 📃 Server-side pagination
* 🔍 Expense filtering & search by vendor
* ⚠️ Global exception handling
* 📚 REST APIs with Swagger documentation

---

## 🛠 Tech Stack

### Backend

* Java
* Spring Boot
* Spring Data JPA
* MySQL
* Swagger (OpenAPI)
* Lombok

### Frontend

* React
* TypeScript
* Material UI
* Axios

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
JPA Repository
     │
MySQL Database
```

---

## 📂 Project Structure

```
spendsense
│
├── backend
│   ├── controller
│   ├── service
│   ├── repository
│   ├── dto
│   ├── model
│   ├── exception
│   └── config
│
├── frontend
│   ├── components
│   ├── api
│   ├── pages
│
└── README.md
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

## 📊 Dashboard Insights

SpendSense dashboard provides:

* Monthly category spending totals
* Top 5 vendors by spend
* Anomaly detection alerts
* Category-wise analytics

---

## 🚀 Future Improvements

* Authentication (JWT)
* Mobile-optimized UI
* AI-based features

---

## 👨‍💻 Author

Mohit Kumar

Frontend enthusiast passionate about building scalable full-stack applications.

---

⭐ If you found this project useful, consider giving it a star!
