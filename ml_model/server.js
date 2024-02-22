const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Endpoint to make predictions
app.post('/predict', (req, res) => {
  const inputData = req.body; // Assuming input data is sent in the request body
  const prediction = predict(inputData); // Make prediction using your ML model
  res.json({ prediction });
});

// Start the server
const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});