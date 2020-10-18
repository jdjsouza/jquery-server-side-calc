$(document).ready(onReady);
// let mathOp;

function onReady() {
  $('.js-btn-math').on('click', mathOperator);
  $('.js-btn-clear').on('click', mathClear);
  $('.js-btn-equal').on('click', mathEqual);

  getHistory(); // render the history on page load
}

function mathOperator() {
  // this function sets the color of the operator selected by a class and css
  $(this).parent().find('button').removeClass('button-clicked'); // remove the class from buttons
  $(this).addClass('button-clicked'); // add class so I can later retrieve the operator name value
  //   console.log(mathOp);
}

function mathClear() {
  $(this).parent().find('button').removeClass('button-clicked');
  $('.js-input-first').val('');
  $('.js-input-second').val('');
}

function mathEqual() {
  let mathOp = null;
  mathOp = $('.button-clicked').prop('name');
  // getting the name value of the operator selected by the class added when it was clicked
  // did they fill the form out?
  if (mathOp == null) {
    alert('Please select a math operator.');
    return; // breaks out of the function intentionally
  }
  if ($('.js-input-first').val() === '') {
    alert('Please enter the first number.');
    return; // breaks out of the function intentionally
  }
  if ($('.js-input-second').val() === '') {
    alert('Please enter the second number.');
    return; // breaks out of the function intentionally
  }
  // make sure the number order is passed correctly
  let firstNumber = Number($('.js-input-first').val());
  let secondNumber = Number($('.js-input-second').val());
  let inputs = [mathOp, firstNumber, secondNumber]; // array structure for doing the math on the server

  //   console.log('array inputs before sending', inputs);

  $.ajax({
    type: 'POST',
    url: '/math',
    data: { math: inputs }, // the array needs to be wrapped in an object or you only receive empty strings
  })
    .then(function (response) {
      console.log(response);
      getResults(); // getting results for the current calculation
      getHistory(); // getting the saved history
    })
    .catch(function (err) {
      console.log(err);
      alert('Post failed');
    });
} // end mathEqual function

function getResults() {
  $.ajax({
    type: 'GET',
    url: '/results',
  })
    .then(function (response) {
      renderResult(response); // render the results
    })
    .catch(function (err) {
      console.log(err);
      alert('Failed to retrieve results.');
    });
} // end getResults function

function getHistory() {
  $.ajax({
    type: 'GET',
    url: '/results/history',
  })
    .then(function (response) {
      renderHistory(response); // render the history of calculations
    })
    .catch(function (err) {
      console.log(err);
      alert('Failed to retrieve history.');
    });
} // end getHistory function

function renderResult(result) {
  //   console.log(result);
  const jsCalc = $('.js-calc-result');
  if (result === undefined) {
    jsCalc.text('0');
  }
  jsCalc.text(result);
} // end renderResult function

function renderHistory(resultHistory) {
  const jsResults = $('.js-results');
  jsResults.empty();
  for (let i = 0; i < resultHistory.length; i++) {
    jsResults.append(`<li>${resultHistory[i]}</li>`);
  }
} // end renderHistory function
