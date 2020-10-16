const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

app.post('/math', (req, res) => {
  // input data
  // {
  //  firstNumber: Number(),
  //  secondNumber: Number(),
  //  operation: '',
  // }
  // retrieve array from page containing both numbers and which input was hit
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
