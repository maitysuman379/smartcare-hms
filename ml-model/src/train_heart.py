import pandas as pd
import joblib

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import accuracy_score


# ==========================================
# 1. Load dataset
# ==========================================

data = pd.read_csv("data/heart.csv")


# ==========================================
# 2. Convert target to binary
# ==========================================

# Original target:
# 0 = No heart disease
# 1,2,3,4 = Heart disease

data["target"] = (data["target"] > 0).astype(int)


# ==========================================
# 3. Separate features and target
# ==========================================

X = data.drop("target", axis=1)
y = data["target"]


# ==========================================
# 4. Train/Test Split
# ==========================================

X_train, X_test, y_train, y_test = train_test_split(
    X,
    y,
    test_size=0.20,
    random_state=42,
    stratify=y
)


# ==========================================
# 5. Handle missing values
# ==========================================

imputer = SimpleImputer(
    strategy="most_frequent"
)

# Fit imputer only on training data
X_train = pd.DataFrame(
    imputer.fit_transform(X_train),
    columns=X_train.columns,
    index=X_train.index
)

# Apply same imputer to test data
X_test = pd.DataFrame(
    imputer.transform(X_test),
    columns=X_test.columns,
    index=X_test.index
)


# ==========================================
# 6. Feature Scaling
# ==========================================

scaler = StandardScaler()

# Fit scaler only on training data
X_train = scaler.fit_transform(X_train)

# Apply same scaler to test data
X_test = scaler.transform(X_test)


# ==========================================
# 7. Create Logistic Regression model
# ==========================================

model = LogisticRegression(
    max_iter=2000,
    random_state=42
)


# ==========================================
# 8. Train model
# ==========================================

model.fit(X_train, y_train)


# ==========================================
# 9. Make predictions
# ==========================================

y_pred = model.predict(X_test)


# ==========================================
# 10. Calculate accuracy
# ==========================================

accuracy = accuracy_score(
    y_test,
    y_pred
)


# ==========================================
# 11. Display results
# ==========================================

print("===== HEART DISEASE MODEL =====")

print(f"Training records : {len(X_train)}")
print(f"Testing records  : {len(X_test)}")

print(f"\nAccuracy : {accuracy:.4f}")
print(f"Accuracy : {accuracy * 100:.2f}%")


# ==========================================
# 12. Save trained model
# ==========================================

joblib.dump(
    model,
    "models/heart_model.pkl"
)


# ==========================================
# 13. Save imputer
# ==========================================

joblib.dump(
    imputer,
    "models/heart_imputer.pkl"
)


# ==========================================
# 14. Save scaler
# ==========================================

joblib.dump(
    scaler,
    "models/heart_scaler.pkl"
)


# ==========================================
# 15. Confirmation
# ==========================================

print("\n===== MODEL FILES =====")

print("✓ heart_model.pkl")
print("✓ heart_imputer.pkl")
print("✓ heart_scaler.pkl")

print("\nModel training and saving completed successfully!")