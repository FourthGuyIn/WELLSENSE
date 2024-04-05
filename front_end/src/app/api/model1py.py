# front_end\src\app\api\model1.py

import pandas as pd
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score
import joblib

def make_prediction(file_path):
    # Load model and scaler
    model = joblib.load('bsw_model.pkl')
    scaler = joblib.load('bsw_scaler.pkl')
    
    # Read input data
    test_data = pd.read_csv(file_path, delimiter='\t')
    test_data = test_data[['P-TPT', 'T-TPT', 'P-MON-CKP']].dropna()
    
    # Transform data and make predictions
    X_test = scaler.transform(test_data)
    predictions_proba = model.predict_proba(X_test)
    chance_of_BSW = predictions_proba[:, 1].mean() * 100
    prediction_text = f"{chance_of_BSW:.2f}% Chance of Abrupt increase of BSW"
    
    # Output the prediction to a text file
    with open('prediction_output.txt', 'w') as output_file:
        output_file.write(prediction_text)
    
    return prediction_text