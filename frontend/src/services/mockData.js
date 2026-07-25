// Mock data — stands in for real backend/AI API calls until they're built.

export const currentPatient = {
  name: "Rahul Sharma",
  age: 34,
  gender: "Male",
  bloodGroup: "O+",
};

export const healthProfile = {
  submitted: true,
  bmi: 27.4,
  bpSys: 132,
  bpDia: 86,
  glucose: 118,
};

export const aiPrediction = {
  disease: "Diabetes",
  riskPercentage: 62,
  riskLevel: "medium", // 'low' | 'medium' | 'high'
};

export const matchedDoctor = {
  name: "Dr. Anita Verma",
  specialization: "Endocrinologist",
  experience: "9 years",
  available: true,
};

export const appointments = [
  {
    id: 1,
    doctor: "Dr. Anita Verma",
    specialization: "Endocrinologist",
    date: "2026-07-29",
    time: "10:30 AM",
    status: "Pending",
  },
  {
    id: 2,
    doctor: "Dr. Rohan Das",
    specialization: "General Physician",
    date: "2026-07-15",
    time: "4:00 PM",
    status: "Completed",
  },
];
export const currentDoctor = {
  name: "Dr. Anita Verma",
  specialization: "Endocrinologist",
  experience: "9 years",
  available: true,
};

export const doctorPatients = [
  {
    id: 1,
    name: "Rahul Sharma",
    age: 34,
    gender: "Male",
    predictedDisease: "Diabetes",
    riskPercentage: 62,
    riskLevel: "medium",
    lastVisit: "2026-07-15",
    status: "Pending",
  },
  {
    id: 2,
    name: "Priya Nair",
    age: 51,
    gender: "Female",
    predictedDisease: "Diabetes",
    riskPercentage: 84,
    riskLevel: "high",
    lastVisit: "2026-07-20",
    status: "Pending",
  },
  {
    id: 3,
    name: "Sanjay Gupta",
    age: 28,
    gender: "Male",
    predictedDisease: "Diabetes",
    riskPercentage: 22,
    riskLevel: "low",
    lastVisit: "2026-07-10",
    status: "Completed",
  },
];
export const allDoctors = [
  {
    id: 1,
    name: "Dr. Anita Verma",
    specialization: "Endocrinologist",
    qualification: "MD, DM Endocrinology",
    experience: "9 years",
    fee: 600,
    available: true,
  },
  {
    id: 2,
    name: "Dr. Rohan Das",
    specialization: "General Physician",
    qualification: "MBBS, MD",
    experience: "5 years",
    fee: 400,
    available: true,
  },
  {
    id: 3,
    name: "Dr. Meera Iyer",
    specialization: "Cardiologist",
    qualification: "MD, DM Cardiology",
    experience: "12 years",
    fee: 800,
    available: false,
  },
  {
    id: 4,
    name: "Dr. Kabir Khan",
    specialization: "Nephrologist",
    qualification: "MD, DM Nephrology",
    experience: "7 years",
    fee: 700,
    available: true,
  },
];

export const allPatientsOverview = [
  {
    id: 1,
    name: "Rahul Sharma",
    predictedDisease: "Diabetes",
    riskLevel: "medium",
    riskPercentage: 62,
  },
  {
    id: 2,
    name: "Priya Nair",
    predictedDisease: "Diabetes",
    riskLevel: "high",
    riskPercentage: 84,
  },
  {
    id: 3,
    name: "Sanjay Gupta",
    predictedDisease: "Diabetes",
    riskLevel: "low",
    riskPercentage: 22,
  },
  {
    id: 4,
    name: "Fatima Sheikh",
    predictedDisease: "Heart Disease",
    riskLevel: "high",
    riskPercentage: 91,
  },
  {
    id: 5,
    name: "Arjun Menon",
    predictedDisease: "Kidney Disease",
    riskLevel: "medium",
    riskPercentage: 58,
  },
];
