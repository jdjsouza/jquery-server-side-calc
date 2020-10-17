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
  mathData = req.body.math;
  //  array ['operator', num1, num2]
  if (mathData[0] === 'add') {
    mathResult = Number(mathData[1]) + Number(mathData[2]);
    mathHistory.push(mathData[1] + ' + ' + mathData[2] + ' = ' + mathResult);
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
  res.sendStatus(200);
});

// app.get('/results', (req, res) => {
//   res.send(mathResult);
// });

app.get('/results/history', (req, res) => {
  res.send(mathHistory);
});

app.get('/results', (req, res) => {
  const mathArray = [mathResult];
  res.send(mathArray);
});

app.listen(PORT, () => {
  console.log('Server is running on port', PORT);
});
