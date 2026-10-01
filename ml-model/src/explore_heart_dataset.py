import pandas as pd

# Load dataset
data = pd.read_csv("data/heart.csv")

print("===== DATASET SHAPE =====")
print(data.shape)

print("\n===== FIRST 5 ROWS =====")
print(data.head())

print("\n===== DATA TYPES =====")
print(data.dtypes)

print("\n===== MISSING VALUES =====")
print(data.isnull().sum())

print("\n===== TARGET VALUES =====")
print(data["target"].value_counts())