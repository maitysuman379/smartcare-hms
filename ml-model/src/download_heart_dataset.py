from ucimlrepo import fetch_ucirepo

# UCI Heart Disease dataset
heart_disease = fetch_ucirepo(id=45)

# Get features and target
X = heart_disease.data.features
y = heart_disease.data.targets

# Combine features and target
data = X.copy()
data["target"] = y.iloc[:, 0]

# Save as CSV
data.to_csv("data/heart.csv", index=False)

print("Heart Disease dataset downloaded successfully!")
print(f"Rows: {data.shape[0]}")
print(f"Columns: {data.shape[1]}")
print("\nColumns:")
print(data.columns.tolist())