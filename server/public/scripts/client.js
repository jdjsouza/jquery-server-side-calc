$(document).ready(onReady);
// let mathOp;

function onReady() {
  $('.js-btn-math').on('click', mathOperator);
  $('.js-btn-clear').on('click', mathClear);
  $('.js-btn-equal').on('click', mathEqual);

  getHistory();
}

function mathOperator() {
  $(this).parent().find('button').removeClass('button-clicked');
  $(this).addClass('button-clicked');
  //   mathOp = $(this).prop('name');
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

  if (mathOp == null) {
    alert('Please select a math operator.');
    return;
  }
  if ($('.js-input-first').val() === '') {
    alert('Please enter the first number.');
    return;
  }
  if ($('.js-input-second').val() === '') {
    alert('Please enter the second number.');
    return;
  }

  let firstNumber = Number($('.js-input-first').val());
  let secondNumber = Number($('.js-input-second').val());
  let inputs = [mathOp, firstNumber, secondNumber];

  $.ajax({
    type: 'POST',
    url: '/math',
    data: { math: inputs },
  })
    .then(function (response) {
      console.log(response);
      getResults();
      getHistory();
    })
    .catch(function (err) {
      console.log(err);
      alert('Post failed');
    });
}

function getResults() {
  $.ajax({
    type: 'GET',
    url: '/results',
  })
    .then(function (response) {
      renderResult(response);
    })
    .catch(function (err) {
      console.log(err);
      alert('Failed to retrieve results.');
    });
}

function getHistory() {
  $.ajax({
    type: 'GET',
    url: '/results/history',
  })
    .then(function (response) {
      renderHistory(response);
    })
    .catch(function (err) {
      console.log(err);
      alert('Failed to retrieve history.');
    });
}

function renderResult(result) {
  const jsCalc = $('.js-calc-result');
  if (result === undefined) {
    jsCalc.text('0');
  }
  jsCalc.text(result);
}

function renderHistory(resultHistory) {
  const jsResults = $('.js-results');
  jsResults.empty();
  for (let i = 0; i < resultHistory.length; i++) {
    jsResults.append(`<li>${resultHistory[i]}</li>`);
  }
}
