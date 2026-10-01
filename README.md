# SmartCare HMS 🏥🤖

**AI-Integrated Hospital Management System** — MCA Major Project (3rd Semester)

SmartCare HMS is a full-stack Hospital Management System designed to manage hospital operations such as patient registration, doctors, departments, appointments, medical records, prescriptions, laboratory services, billing, and notifications.

The system is being extended with an **AI/ML prediction module** that will analyze patient health information, estimate disease risk, and assist in matching patients with appropriate medical specialists.

![Status](https://img.shields.io/badge/status-in--development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/frontend-React.js-61DAFB)
![Node](https://img.shields.io/badge/backend-Node.js%2FExpress-339933)
![Flask](https://img.shields.io/badge/ML%20API-Flask-black)
![ML](https://img.shields.io/badge/ML-scikit--learn%20%7C%20pandas%20%7C%20NumPy-orange)
![Database](https://img.shields.io/badge/database-MySQL-4479A1)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Architecture](#system-architecture)
- [System Workflow](#system-workflow)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [Backend API Modules](#backend-api-modules)
- [AI Model Details](#ai-model-details)
- [Getting Started](#getting-started)
- [Development Progress](#development-progress)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Overview

SmartCare HMS provides a centralized platform for managing common hospital activities.

The current backend provides REST APIs for:

- User authentication and authorization
- User management
- Department management
- Doctor management
- Patient management
- Doctor schedules
- Appointment management
- Medical records
- Medicines
- Prescriptions
- Prescription items
- Laboratory tests
- Laboratory orders
- Laboratory reports
- Billing
- Notifications

The project also includes an AI/ML component planned to support prediction of:

- Heart Disease
- Diabetes
- Kidney Disease
- Low Risk / No detected high-risk category

The AI component will be exposed through a Python Flask REST API and integrated with the Node.js backend.

---

## Features

### 🔑 Authentication & User Management

- User registration
- User login
- Password hashing using bcrypt
- JWT-based authentication
- Role-based authorization
- User status management
- Supported roles:
  - Admin
  - Doctor
  - Patient
  - Receptionist
  - Lab Staff

### 👨‍💼 Admin Module

- Manage users
- Manage departments
- Manage doctors
- Manage patients
- Manage doctor schedules
- Manage appointments
- Manage medical records
- Manage medicines
- Manage prescriptions
- Manage laboratory tests
- Manage laboratory reports
- Manage billing
- Manage notifications

### 🧑‍⚕️ Doctor Module

- View doctor information
- View assigned appointments
- View patients
- Manage medical records
- Create prescriptions
- Add prescription medicines
- Create laboratory orders
- View laboratory reports

### 🧑‍🦰 Patient Module

- Patient registration
- Patient profile management
- View appointments
- View medical records
- View prescriptions
- View laboratory orders and reports
- View billing information
- View notifications

### 🧪 Laboratory Module

- Manage laboratory tests
- Create laboratory orders
- Update laboratory order status
- Create laboratory reports
- View reports by:
  - Patient
  - Doctor
  - Laboratory order

### 💊 Prescription & Medicine Module

- Manage medicines
- Track medicine stock
- Store medicine price and expiry date
- Create prescriptions
- Add medicines to prescriptions
- Specify dosage, frequency, duration, quantity, and instructions

### 💰 Billing Module

- Create patient bills
- Consultation charges
- Medicine charges
- Laboratory charges
- Other charges
- Discount
- Tax
- Automatic total calculation
- Payment status tracking:
  - Pending
  - Partial
  - Paid
  - Cancelled

### 🔔 Notification Module

- Create notifications
- View notifications
- View notifications by user
- Mark notifications as read/unread
- Notification categories:
  - Appointment
  - Prescription
  - Lab Report
  - AI Alert
  - Billing
  - General

---

## Tech Stack

| Component              | Technology                                    |
| ---------------------- | --------------------------------------------- |
| Frontend               | React.js                                      |
| Backend                | Node.js + Express.js                          |
| Database               | MySQL                                         |
| Authentication         | JWT + bcrypt                                  |
| AI/ML Layer            | Python                                        |
| ML API                 | Flask                                         |
| ML Libraries           | scikit-learn, pandas, NumPy                   |
| Possible ML Algorithms | Random Forest / Logistic Regression / XGBoost |
| API Testing            | Postman                                       |
| Development IDE        | VS Code                                       |
| Version Control        | Git & GitHub                                  |
| Data Analysis          | Jupyter Notebook                              |

---

## System Architecture

```text
                    ┌─────────────────────┐
                    │    React Frontend   │
                    │      Client UI      │
                    └──────────┬──────────┘
                               │
                               │ REST API
                               ▼
                    ┌─────────────────────┐
                    │  Node.js + Express  │
                    │    Backend API       │
                    └──────┬────────┬─────┘
                           │        │
                    ┌──────▼───┐    │
                    │  MySQL   │    │
                    │ Database │    │
                    └──────────┘    │
                                    │
                              HTTP Request
                                    │
                                    ▼
                         ┌──────────────────┐
                         │   Flask ML API   │
                         │   Python Models  │
                         └────────┬─────────┘
                                  │
                                  ▼
                         ┌──────────────────┐
                         │  ML Prediction   │
                         │ Heart / Diabetes │
                         │ Kidney / Low Risk│
                         └──────────────────┘
```

---

## System Workflow

### Current Hospital Management Workflow

1. User registers in the system.
2. User logs in.
3. Backend authenticates the user.
4. Role-based authorization determines available operations.
5. Admin manages doctors, departments, patients, and hospital resources.
6. Patients can be registered and managed.
7. Doctors can be assigned to departments.
8. Doctor schedules can be created.
9. Patients can have appointments.
10. Doctors can create medical records.
11. Doctors can create prescriptions.
12. Medicines can be added to prescriptions.
13. Doctors can create laboratory orders.
14. Laboratory staff can manage laboratory reports.
15. Bills can be generated for patients.
16. Notifications can be created and managed.

### Planned AI Workflow

1. Patient submits health information.
2. Backend sends the health information to the Flask ML API.
3. ML model processes the submitted features.
4. Model predicts a disease category.
5. Model returns a prediction and probability/risk value.
6. Backend stores the prediction.
7. The predicted disease is mapped to an appropriate medical specialization.
8. Available doctors matching the specialization are identified.
9. If a suitable specialist is unavailable, the system can fall back to a General Physician.
10. Patient can proceed with an appointment.

> **Note:** The AI/ML prediction pipeline and Flask API are the next major development stage and are not yet completed.

---

## Project Structure

```text
smartcare-hms/
│
├── backend/
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   │
│   │   ├── controllers/
│   │   │   ├── authController.js
│   │   │   ├── userController.js
│   │   │   ├── departmentController.js
│   │   │   ├── doctorController.js
│   │   │   ├── patientController.js
│   │   │   ├── doctorScheduleController.js
│   │   │   ├── appointmentController.js
│   │   │   ├── medicalRecordController.js
│   │   │   ├── medicineController.js
│   │   │   ├── prescriptionController.js
│   │   │   ├── prescriptionItemController.js
│   │   │   ├── labTestController.js
│   │   │   ├── labOrderController.js
│   │   │   ├── labReportController.js
│   │   │   ├── billController.js
│   │   │   └── notificationController.js
│   │   │
│   │   ├── middleware/
│   │   │   ├── authMiddleware.js
│   │   │   └── roleMiddleware.js
│   │   │
│   │   ├── models/
│   │   │   ├── userModel.js
│   │   │   ├── departmentModel.js
│   │   │   ├── doctorModel.js
│   │   │   ├── patientModel.js
│   │   │   ├── doctorScheduleModel.js
│   │   │   ├── appointmentModel.js
│   │   │   ├── medicalRecordModel.js
│   │   │   ├── medicineModel.js
│   │   │   ├── prescriptionModel.js
│   │   │   ├── prescriptionItemModel.js
│   │   │   ├── labTestModel.js
│   │   │   ├── labOrderModel.js
│   │   │   ├── labReportModel.js
│   │   │   ├── billModel.js
│   │   │   └── notificationModel.js
│   │   │
│   │   ├── routes/
│   │   │   ├── authRoutes.js
│   │   │   ├── userRoutes.js
│   │   │   ├── departmentRoutes.js
│   │   │   ├── doctorRoutes.js
│   │   │   ├── patientRoutes.js
│   │   │   ├── doctorScheduleRoutes.js
│   │   │   ├── appointmentRoutes.js
│   │   │   ├── medicalRecordRoutes.js
│   │   │   ├── medicineRoutes.js
│   │   │   ├── prescriptionRoutes.js
│   │   │   ├── prescriptionItemRoutes.js
│   │   │   ├── labTestRoutes.js
│   │   │   ├── labOrderRoutes.js
│   │   │   ├── labReportRoutes.js
│   │   │   ├── billRoutes.js
│   │   │   └── notificationRoutes.js
│   │   │
│   │   └── server.js
│   │
│   ├── .env
│   ├── package.json
│   └── package-lock.json
│
├── frontend/
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
│
├── ml-model/
│   ├── data/
│   ├── notebooks/
│   └── src/
│
├── docs/
│
└── README.md
```

---

# Database Design

SmartCare HMS currently uses **MySQL** as the primary database.

### Main Tables

| Table                        | Purpose                                 |
| ---------------------------- | --------------------------------------- |
| `users`                      | Authentication, user accounts and roles |
| `departments`                | Hospital departments                    |
| `doctors`                    | Doctor profiles and specialization      |
| `patients`                   | Patient information                     |
| `doctor_schedules`           | Doctor availability schedules           |
| `appointments`               | Patient-doctor appointments             |
| `medical_records`            | Patient medical records                 |
| `medicines`                  | Medicine inventory                      |
| `prescriptions`              | Doctor prescriptions                    |
| `prescription_items`         | Medicines belonging to prescriptions    |
| `lab_tests`                  | Available laboratory tests              |
| `lab_orders`                 | Patient laboratory orders               |
| `lab_reports`                | Laboratory results                      |
| `bills`                      | Patient billing information             |
| `payments`                   | Payment records                         |
| `notifications`              | User notifications                      |
| `ai_predictions`             | AI prediction records                   |
| `ai_patient_vitals`          | Patient health data used by AI          |
| `specialist_recommendations` | AI-based specialist recommendations     |
| `audit_logs`                 | System activity/audit information       |

---

# Backend API Modules

The Node.js/Express backend has been implemented and tested module-by-module.

### Authentication

```text
POST /api/auth/register
POST /api/auth/login
```

### Users

```text
GET    /api/users
GET    /api/users/:id
POST   /api/users
PUT    /api/users/:id
DELETE /api/users/:id
```

### Departments

```text
GET    /api/departments
GET    /api/departments/:id
POST   /api/departments
PUT    /api/departments/:id
```

### Doctors

```text
GET    /api/doctors
GET    /api/doctors/:id
POST   /api/doctors
PUT    /api/doctors/:id
```

### Patients

```text
GET    /api/patients
GET    /api/patients/:id
POST   /api/patients
PUT    /api/patients/:id
```

### Doctor Schedules

```text
GET    /api/doctor-schedules
GET    /api/doctor-schedules/doctor/:doctorId
GET    /api/doctor-schedules/:id
POST   /api/doctor-schedules
PUT    /api/doctor-schedules/:id
DELETE /api/doctor-schedules/:id
```

### Appointments

```text
GET    /api/appointments
GET    /api/appointments/patient/:patientId
GET    /api/appointments/doctor/:doctorId
GET    /api/appointments/:id
POST   /api/appointments
PUT    /api/appointments/:id
DELETE /api/appointments/:id
```

### Medical Records

```text
GET    /api/medical-records
GET    /api/medical-records/patient/:patientId
GET    /api/medical-records/doctor/:doctorId
GET    /api/medical-records/:id
POST   /api/medical-records
PUT    /api/medical-records/:id
DELETE /api/medical-records/:id
```

### Medicines

```text
GET    /api/medicines
GET    /api/medicines/:id
POST   /api/medicines
PUT    /api/medicines/:id
DELETE /api/medicines/:id
```

### Prescriptions

```text
GET    /api/prescriptions
GET    /api/prescriptions/patient/:patientId
GET    /api/prescriptions/doctor/:doctorId
GET    /api/prescriptions/:id
POST   /api/prescriptions
PUT    /api/prescriptions/:id
DELETE /api/prescriptions/:id
```

### Prescription Items

```text
GET    /api/prescription-items
GET    /api/prescription-items/prescription/:prescriptionId
GET    /api/prescription-items/medicine/:medicineId
GET    /api/prescription-items/:id
POST   /api/prescription-items
PUT    /api/prescription-items/:id
DELETE /api/prescription-items/:id
```

### Laboratory Tests

```text
GET    /api/lab-tests
GET    /api/lab-tests/:id
POST   /api/lab-tests
PUT    /api/lab-tests/:id
DELETE /api/lab-tests/:id
```

### Laboratory Orders

```text
GET    /api/lab-orders
GET    /api/lab-orders/patient/:patientId
GET    /api/lab-orders/doctor/:doctorId
GET    /api/lab-orders/:id
POST   /api/lab-orders
PUT    /api/lab-orders/:id
DELETE /api/lab-orders/:id
```

### Laboratory Reports

```text
GET    /api/lab-reports
GET    /api/lab-reports/patient/:patientId
GET    /api/lab-reports/doctor/:doctorId
GET    /api/lab-reports/order/:labOrderId
GET    /api/lab-reports/:id
POST   /api/lab-reports
PUT    /api/lab-reports/:id
DELETE /api/lab-reports/:id
```

### Billing

```text
GET    /api/bills
GET    /api/bills/patient/:patientId
GET    /api/bills/:id
POST   /api/bills
PUT    /api/bills/:id
DELETE /api/bills/:id
```

### Notifications

```text
GET    /api/notifications
GET    /api/notifications/user/:userId
GET    /api/notifications/:id
POST   /api/notifications
PUT    /api/notifications/:id
PATCH  /api/notifications/:id/read
DELETE /api/notifications/:id
```

---

# AI Model Details

The AI/ML module is planned as a separate Python service.

## Target Disease Categories

| Disease        | Dataset                            |
| -------------- | ---------------------------------- |
| Heart Disease  | UCI Heart Disease Dataset          |
| Diabetes       | PIMA Indians Diabetes Dataset      |
| Kidney Disease | UCI Chronic Kidney Disease Dataset |
| Low Risk       | Derived prediction category        |

## Planned Approach

The project will use machine learning classification techniques to analyze patient health information.

Possible algorithms include:

- Random Forest
- Logistic Regression
- XGBoost

The model will return:

```text
Predicted Disease
Risk / Probability Percentage
```

The Flask API will expose the trained model through REST endpoints.

### Planned AI Flow

```text
Patient Health Data
        ↓
Node.js Backend
        ↓
Flask ML API
        ↓
Trained ML Model
        ↓
Prediction + Probability
        ↓
Node.js Backend
        ↓
Store AI Prediction
        ↓
Specialist Recommendation
```

> The AI datasets, training pipeline, trained models, and Flask inference API are the next development stage.

---

# Getting Started

## Prerequisites

Install:

- Node.js 18+
- MySQL 8+
- Python 3.10+
- Git
- VS Code
- Postman

---

## Backend Setup

```bash
cd backend
npm install
```

Start development server:

```bash
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

Health check:

```text
GET http://localhost:5000/api/health
```

---

## Environment Variables

Create:

```text
backend/.env
```

Example:

```env
PORT=5000

DB_HOST=localhost
DB_USER=root
DB_PASSWORD=YOUR_MYSQL_PASSWORD
DB_NAME=smartcare_hms
DB_PORT=3306

JWT_SECRET=YOUR_JWT_SECRET
```

Do not commit `.env` to GitHub.

---

## Database Setup

Create the MySQL database:

```sql
CREATE DATABASE smartcare_hms;
```

Then execute the project database schema.

The database contains the tables required for:

- Authentication
- Hospital management
- Appointments
- Medical records
- Prescriptions
- Laboratory services
- Billing
- Notifications
- AI prediction storage
- Specialist recommendations
- Audit logging

---

## Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

The frontend will communicate with the Node.js backend through REST APIs.

---

## ML Model Setup

The planned ML service will be located in:

```text
ml-model/
```

Expected setup:

```bash
cd ml-model
pip install -r requirements.txt
python src/app.py
```

The Flask API will then be connected to the Node.js backend.

---

# Development Progress

| Module                                 | Status      |
| -------------------------------------- | ----------- |
| GitHub Repository & Project Scaffold   | ✅ Complete |
| MySQL Database Schema                  | ✅ Complete |
| Node.js + Express Backend Setup        | ✅ Complete |
| Database Connection                    | ✅ Complete |
| Authentication APIs                    | ✅ Complete |
| JWT Authentication Middleware          | ✅ Complete |
| Role-Based Authorization               | ✅ Complete |
| User Management                        | ✅ Complete |
| Department Management                  | ✅ Complete |
| Doctor Management                      | ✅ Complete |
| Patient Management                     | ✅ Complete |
| Doctor Schedule Management             | ✅ Complete |
| Appointment Management                 | ✅ Complete |
| Medical Records                        | ✅ Complete |
| Medicine Management                    | ✅ Complete |
| Prescription Management                | ✅ Complete |
| Prescription Items                     | ✅ Complete |
| Laboratory Tests                       | ✅ Complete |
| Laboratory Orders                      | ✅ Complete |
| Laboratory Reports                     | ✅ Complete |
| Billing                                | ✅ Complete |
| Notifications                          | ✅ Complete |
| AI Patient Vitals                      | 🔲 Pending  |
| AI Prediction Model Training           | 🔲 Pending  |
| Flask ML API                           | 🔲 Pending  |
| AI Prediction Integration with Node.js | 🔲 Pending  |
| Specialist Recommendation Logic        | 🔲 Pending  |
| React Frontend Integration             | 🔲 Pending  |
| End-to-End AI Workflow                 | 🔲 Pending  |
| Final Testing                          | 🔲 Pending  |
| Project Documentation                  | 🔲 Pending  |

---

# Current Backend Status

The Node.js backend has been developed using a modular architecture:

```text
Routes
  ↓
Controllers
  ↓
Models
  ↓
MySQL Database
```

Authentication and authorization are implemented using:

```text
JWT
+
bcrypt
+
Role-Based Access Control
```

The implemented backend modules have been tested through Postman using real project records rather than dummy CRUD data.

---

# Future Enhancements

Possible future improvements include:

- AI-based disease risk prediction
- Automatic specialist recommendation
- AI high-risk patient alerts
- Email notifications
- SMS appointment reminders
- Online/telemedicine consultation
- Doctor availability validation
- Appointment double-booking prevention
- Payment gateway integration
- Hospital dashboard analytics
- Advanced reporting
- Prescription PDF generation
- Laboratory report file uploads
- Patient medical-history timeline
- Expanded disease prediction categories
- Improved ML model evaluation and monitoring

---

# Important Project Note

SmartCare HMS is intended as an **academic MCA major project** demonstrating the integration of:

```text
Full-Stack Web Development
        +
REST API Development
        +
Relational Database Management
        +
Authentication & Authorization
        +
Machine Learning
        +
AI API Integration
```

The AI prediction feature is designed as a **decision-support/educational component**, not as a replacement for professional medical diagnosis.

---

## License

This project is licensed under the MIT License.

See the `LICENSE` file for details.

---

## Development Status

**Current stage:** Backend hospital-management modules completed and tested.

**Next major stage:** AI/ML model development, Flask inference API, and integration with the Node.js backend.

**Last updated:** 29 September 2026
