$(document).ready(onReady);

function onReady() {
  console.log('JQ Loaded');

  $('.js-btn-math').on('click', mathOperator);
}

function mathOperator() {
  $(this).parent().find('button').removeClass('button-clicked');
  $(this).addClass('button-clicked');
  let mathOp = $(this).prop('name');
  console.log('Math Operator', mathOp);
}
