const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 5000;
let mathData;
let mathResult;
const mathHistory = [];

// This must be added before GET & POST routes.
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(express.static('server/public'));

app.post('/math', (req, res) => {
  //  array received {math: ['operator', num1, num2] }
  mathData = req.body.math; // turn array into ['operator', 'firstNumber', 'secondNumber']

  // if statements to do the calculation based on the operator sent
  if (mathData[0] === 'add') {
    mathResult = Number(mathData[1]) + Number(mathData[2]);
    mathHistory.push(mathData[1] + ' + ' + mathData[2] + ' = ' + mathResult); // add to history array as a string
  } else if (mathData[0] === 'subtract') {
    mathResult = Number(mathData[1]) - Number(mathData[2]);
    mathHistory.push(mathData[1] + ' - ' + mathData[2] + ' = ' + mathResult);
  } else if (mathData[0] === 'multiply') {
    mathResult = Number(mathData[1]) * Number(mathData[2]);
    mathHistory.push(mathData[1] + ' * ' + mathData[2] + ' = ' + mathResult);
  } else if (mathData[0] === 'divide') {
    mathResult = Number(mathData[1]) / Number(mathData[2]);
    mathHistory.push(mathData[1] + ' / ' + mathData[2] + ' = ' + mathResult);
  }
  res.sendStatus(200); // send Okay
});

app.get('/results/history', (req, res) => {
  res.send(mathHistory);
});

app.get('/results', (req, res) => {
  const mathArray = [mathResult]; // get can't send a number, wrap the number in an array
  res.send(mathArray);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
