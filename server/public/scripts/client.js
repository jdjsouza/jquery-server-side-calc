$(document).ready(onReady);
let mathOp;

function onReady() {
  console.log('JQ Loaded');

  $('.js-btn-math').on('click', mathOperator);
  $('.js-btn-clear').on('click', mathClear);
}

function mathOperator() {
  $(this).parent().find('button').removeClass('button-clicked');
  $(this).addClass('button-clicked');
  mathOp = $(this).prop('name');
}

function mathClear() {
  $(this).parent().find('button').removeClass('button-clicked');
  $('.js-input-first').val('');
  $('.js-input-second').val('');
  mathOp = null;
}
