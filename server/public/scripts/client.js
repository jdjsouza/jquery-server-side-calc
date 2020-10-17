$(document).ready(onReady);
// let mathOp;

function onReady() {
  $('.js-btn-math').on('click', mathOperator);
  $('.js-btn-clear').on('click', mathClear);
  $('.js-btn-equal').on('click', mathEqual);

  render();
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
  //   mathOp = null;
}

function mathEqual() {
  let mathOp = $('.button-clicked').prop('name');
  let firstNumber = $('.js-input-first').val();
  let secondNumber = $('.js-input-second').val();
  //   if (mathOp === undefined) {
  //     alert('Please select a math operator.');
  //     return;
  //   }
  let inputs = [mathOp, firstNumber, secondNumber];
  console.log(inputs);

  $.ajax({
    type: 'POST',
    url: '/math',
    data: { math: inputs },
  })
    .then(function (response) {
      console.log(response);

      // GET -> results
      render();
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
      render(response);
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
      render(response);
    })
    .catch(function (err) {
      console.log(err);
      alert('Failed to retrieve history.');
    });
}

function renderResults(results) {
  console.log(resultHistory);
  const $results = $('.js-results');

  $results.empty();
  for (let i = 0; i < resultHistory.length; i++) {
    const round = resultHistory[i];

    $results.append(`<li>Round ${i + 1}</li>`);
    for (let playerResults of round) {
      $results.append(
        `<li>${playerResults.name}, guessed ${playerResults.guess} <span>${playerResults.result}</span></li>`
      );
    }
  }
}

function render(resultHistory) {
  console.log(resultHistory);
  const $results = $('.js-results');

  $results.empty();
  for (let i = 0; i < resultHistory.length; i++) {
    const round = resultHistory[i];

    $results.append(`<li>Round ${i + 1}</li>`);
    for (let playerResults of round) {
      $results.append(
        `<li>${playerResults.name}, guessed ${playerResults.guess} <span>${playerResults.result}</span></li>`
      );
    }
  }
}
