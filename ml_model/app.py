
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import MinMaxScaler
from sklearn.metrics import accuracy_score
from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)

mongo_uri="mongodb://localhost:27017/Project"
client=MongoClient(mongo_uri)
db=client['Project']
collection=db['entries']


def myfnc(input_data):

    cursor=collection.find({})
    data=pd.DataFrame(list(cursor))
    
    # data = pd.read_csv("C:/Users/kusha/Downloads/diabetesDataset.csv")
    X = data.drop(columns=["Outcome"])
    y = data["Outcome"]
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    scaler = MinMaxScaler()
    X_train_scaled = scaler.fit_transform(X_train)
    X_test_scaled = scaler.transform(X_test)

    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train_scaled, y_train)


    y_pred = model.predict(X_test_scaled)
    mse = mean_squared_error(y_test, y_pred)
    # print("Mean Squared Error:", mse)

    # y_pred_binary = [1 if pred >= 0.5 else 0 for pred in y_pred]

    new_data = [input_data["heredity"], input_data["physicalActivity"], input_data["junk"], input_data["glucose"], input_data["bp"], input_data["bmi"], input_data["age"]]
    new_data_scaled = scaler.transform([new_data])
    predictions = model.predict(new_data_scaled)
    scaled_prediction = int(predictions * 10)
    print(scaled_prediction)
    return scaled_prediction



@app.route('/predict', methods=['POST'])
def predict():
 
    input_data = request.json
    predictions = myfnc(input_data)
    return jsonify(predictions)


if __name__ == '__main__':
    app.run(debug=True)