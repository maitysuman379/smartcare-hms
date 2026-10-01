import pandas as pd

from sklearn.model_selection import train_test_split
from sklearn.impute import SimpleImputer


# ==========================================
# 1. Load dataset
# ==========================================

data = pd.read_csv("data/heart.csv")


# ==========================================
# 2. Convert target to binary
# ==========================================

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
# 6. Display results
# ==========================================

print("===== DATA SPLIT =====")

print(f"Total records : {len(data)}")
print(f"Training data : {len(X_train)}")
print(f"Testing data  : {len(X_test)}")

print("\n===== TARGET DISTRIBUTION =====")

print("Training:")
print(y_train.value_counts())

print("\nTesting:")
print(y_test.value_counts())

print("\n===== MISSING VALUES AFTER IMPUTATION =====")

print(X_train.isnull().sum())

print("\nPreprocessing completed successfully!")