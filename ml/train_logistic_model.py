import pandas as pd
import numpy as np
from pymongo import MongoClient
from sklearn.linear_model import LogisticRegression
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder
import joblib
from datetime import datetime

# 1. Connect to MongoDB
client = MongoClient("mongodb://localhost:27017/")
db = client['Deadstock']
collection = db['ExpiryLog']

# 2. Load and Prepare Data
data = list(collection.find({}))

df = pd.DataFrame(data)
print("Available columns:", df.columns.tolist())
print(df.head())


# Drop entries with missing required fields
df = df.dropna(subset=['expiryDate', 'logDate', 'expiryRisk'])

# Convert dates to datetime
df['expiryDate'] = pd.to_datetime(df['expiryDate'])
df['logDate'] = pd.to_datetime(df['logDate'])

# 3. Feature Engineering
df['stockAge'] = (df['expiryDate'] - df['logDate']).dt.days

# Encode expiry risk
le = LabelEncoder()
df['expiryRiskEncoded'] = le.fit_transform(df['expiryRisk'])

# 4. Model Training
X = df[['stockAge']]
y = df['expiryRiskEncoded']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

# 5. Save Model and Label Encoder
joblib.dump(model, 'expiry_risk_model.pkl')
joblib.dump(le, 'risk_label_encoder.pkl')

print("Model and encoder saved successfully.")
