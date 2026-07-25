# SmartCare HMS 🏥🤖

**AI-Integrated Hospital Management System** — MCA Major Project (3rd Semester)

SmartCare HMS is a full-stack Hospital Management System enhanced with a machine learning module. Beyond standard hospital operations (registration, scheduling, prescriptions), the system predicts a patient's likely disease category and risk percentage from submitted health data, then automatically routes the patient to a doctor of the matching specialization — falling back to a General Physician when no specialist is available.

![Status](https://img.shields.io/badge/status-in--development-yellow)
![License](https://img.shields.io/badge/license-MIT-blue)
![React](https://img.shields.io/badge/frontend-React.js-61DAFB)
![Node](https://img.shields.io/badge/backend-Node.js%2FExpress-339933)
![Flask](https://img.shields.io/badge/ML%20API-Flask-black)
![ML](https://img.shields.io/badge/ML-scikit--learn%20%7C%20XGBoost-orange)

---

## 📋 Table of Contents

- [Overview](#overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [System Workflow](#system-workflow)
- [Project Structure](#project-structure)
- [Database Design](#database-design)
- [AI Model Details](#ai-model-details)
- [Getting Started](#getting-started)
- [Future Enhancements](#future-enhancements)
- [License](#license)

---

## Overview

The system supports three user roles — **Admin**, **Doctor**, and **Patient** — with an end-to-end flow from patient health-data submission to AI-based diagnosis suggestion, doctor assignment, appointment booking, and prescription management.

The AI model is scoped to three common, well-documented conditions — **Heart Disease**, **Diabetes**, and **Kidney Disease** — to keep the project achievable within a semester timeline.

## Features

### 🔑 Admin Module

- Manage doctors (add/edit/delete) and departments
- View all patients & appointments
- Monitor AI-flagged high-risk patients
- Toggle doctor availability

### 🧑‍⚕️ Doctor Module

- Dashboard filtered to their specialization
- View only patients matching their predicted disease
- View patient history & AI risk score
- Add diagnosis/prescription, mark appointments complete

### 🧑‍🦰 Patient Module

- Register/login
- Fill health profile (vitals + symptoms)
- View AI-predicted disease & risk score
- Get auto-matched with the right doctor
- Book/view appointments and prescriptions

### 🤖 AI Prediction Module

- Takes patient vitals & symptoms as input
- Predicts disease type (Heart Disease / Diabetes / Kidney Disease / Low Risk) with a risk percentage
- Served as a REST API via Flask

### 🔀 Doctor-Matching Module

- Maps predicted disease → medical specialization
- Lists available doctors of that specialization
- Falls back automatically to a General Physician if none available

---

## Tech Stack

| Component       | Technology                                                                 |
| --------------- | -------------------------------------------------------------------------- |
| Frontend        | React.js (HTML, CSS, JavaScript)                                           |
| Backend         | Node.js with Express.js                                                    |
| Database        | MongoDB / MySQL                                                            |
| AI / ML Layer   | Python (scikit-learn, pandas, NumPy) served via Flask REST API             |
| AI Technique    | Multi-class Classification (Random Forest / XGBoost / Logistic Regression) |
| Version Control | Git & GitHub                                                               |
| Tools           | VS Code, Postman, Jupyter Notebook                                         |

---

## System Workflow

1. Patient registers and logs in.
2. Patient fills the Health Profile form (age, BMI, BP, glucose, symptoms, family history, habits).
3. AI model predicts the disease type and a risk percentage.
4. System maps the predicted disease to a medical specialization.
5. Available doctors of that specialization are listed; falls back to a General Physician if none exist.
6. Patient books an appointment with the suggested/chosen doctor.
7. Doctor views the patient's health profile, AI risk score, and history, then adds diagnosis and prescription.
8. Admin monitors all activity and manages doctors, departments, and high-risk patient alerts.

---

## Project Structure

```
smartcare-hms/
├── backend/                # Node.js + Express REST API
│   └── src/
│       ├── routes/
│       ├── controllers/
│       ├── models/
│       ├── middleware/
│       └── config/
├── frontend/                # React.js client
│   └── src/
│       ├── components/
│       ├── pages/
│       └── services/
├── ml-model/                 # Python ML training + Flask inference API
│   ├── data/
│   ├── notebooks/
│   └── src/
├── docs/                     # Project synopsis, ER diagrams, workflow docs
└── README.md
```

---

## Database Design (Key Tables)

| Table            | Key Fields                                                                                                       |
| ---------------- | ---------------------------------------------------------------------------------------------------------------- |
| `users`          | id, name, email, password, role                                                                                  |
| `patients`       | user_id, age, gender, phone, address, blood_group                                                                |
| `health_profile` | patient_id, height, weight, bp_sys, bp_dia, glucose, smoking, family_history, predicted_disease, risk_percentage |
| `doctors`        | user_id, specialization, qualification, experience, fee, is_available                                            |
| `appointments`   | id, patient_id, doctor_id, date, time, status                                                                    |
| `prescriptions`  | id, appointment_id, doctor_id, diagnosis, medicines, notes                                                       |

---

## AI Model Details

**Datasets used:**

| Disease        | Dataset                            |
| -------------- | ---------------------------------- |
| Heart Disease  | UCI Heart Disease Dataset          |
| Diabetes       | PIMA Indians Diabetes Dataset      |
| Kidney Disease | UCI Chronic Kidney Disease Dataset |

**Approach:**

1. Combine the three datasets into a unified feature set with a common target label: `disease_type`.
2. Train a multi-class classification model (Random Forest / XGBoost) to predict `disease_type` and its probability (used as risk %).
3. Expose the trained model as a REST API endpoint (Flask) that the Node backend calls when a patient submits their health profile.

---

## Getting Started

### Prerequisites

- Node.js (v18+)
- Python 3.10+
- MongoDB or MySQL

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm start
```

### ML Model API

```bash
cd ml-model
pip install -r requirements.txt
python src/app.py
```

Copy `.env.example` to `.env` in `backend/` and fill in your database and ML API URL before running.

---

## Future Enhancements

- Telemedicine (video consultation) integration
- SMS/email notifications for appointment reminders
- Waitlist system for fully booked specialists
- Expanding the AI model to more disease categories

---

## License

This project is licensed under the MIT License — see [LICENSE](LICENSE) for details.

## 🚧 Development Progress

| Module                                     | Status                                          |
| ------------------------------------------ | ----------------------------------------------- |
| GitHub repo & project scaffold             | ✅ Done                                         |
| Frontend — React + Vite setup              | ✅ Done                                         |
| Frontend — Routing & sidebar navigation    | ✅ Done                                         |
| Frontend — Login page                      | ✅ Done (split-screen design + form validation) |
| Frontend — Register page                   | 🔲 In progress                                  |
| Frontend — Health Profile form             | 🔲 Not started                                  |
| Frontend — Patient/Doctor/Admin dashboards | 🔲 Not started                                  |
| Backend — Node.js + Express setup          | 🔲 Not started                                  |
| Backend — Database schema                  | 🔲 Not started                                  |
| Backend — Auth APIs                        | 🔲 Not started                                  |
| ML Model — Training pipeline               | 🔲 Not started                                  |
| ML Model — Flask API                       | 🔲 Not started                                  |

_Last updated: 26 July 2026_

---
