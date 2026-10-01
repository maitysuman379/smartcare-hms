import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.metrics import (
    accuracy_score,
    precision_score,
    recall_score,
    f1_score,
    confusion_matrix
)


# ==========================================
# 1. Load dataset
# ==========================================

data = pd.read_csv("data/heart.csv")


# ==========================================
# 2. Convert target to binary
# ==========================================

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

imputer = SimpleImputer(strategy="most_frequent")

X_train = pd.DataFrame(
    imputer.fit_transform(X_train),
    columns=X_train.columns,
    index=X_train.index
)

X_test = pd.DataFrame(
    imputer.transform(X_test),
    columns=X_test.columns,
    index=X_test.index
)


# ==========================================
# 6. Feature Scaling
# ==========================================

scaler = StandardScaler()

X_train = scaler.fit_transform(X_train)
X_test = scaler.transform(X_test)


# ==========================================
# 7. Create and train model
# ==========================================

model = LogisticRegression(
    max_iter=2000,
    random_state=42
)

model.fit(X_train, y_train)


# ==========================================
# 8. Prediction
# ==========================================

y_pred = model.predict(X_test)


# ==========================================
# 9. Evaluation Metrics
# ==========================================

accuracy = accuracy_score(y_test, y_pred)

precision = precision_score(y_test, y_pred)

recall = recall_score(y_test, y_pred)

f1 = f1_score(y_test, y_pred)

cm = confusion_matrix(y_test, y_pred)


# ==========================================
# 10. Display Results
# ==========================================

print("===== HEART DISEASE MODEL EVALUATION =====")

print(f"\nAccuracy  : {accuracy:.4f} ({accuracy * 100:.2f}%)")
print(f"Precision : {precision:.4f}")
print(f"Recall    : {recall:.4f}")
print(f"F1-Score  : {f1:.4f}")

print("\n===== CONFUSION MATRIX =====")

print(cm)

print("\nEvaluation completed successfully!")