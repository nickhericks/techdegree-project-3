/********************************
Basic Info section
********************************/
// Set focus to name field on page load
$('#name').focus();

// Hide Other Job Role field on page load
$('#other').hide();

// Show Other Job Role field if 'Other' is selected
$('#title').on('change', function() {
  if($('#title').val() === 'other') {
    $('#other').slideDown();
  } else {
    $('#other').slideUp();
  }
});



/********************************
T-Shirt section
********************************/
// Hide Color dropdown menu on page load
$('#colors-js-puns').hide();
const $colors = $('#color option');
$colors.hide();

$('#design').on('change', function() {
  if($('#design').val() !== 'select') {
    $('#colors-js-puns').fadeIn(250);
  } else {
    $('#colors-js-puns').fadeOut();
  }

  if($('#design').val() === 'heart js') {
    console.log($('#design').val());
    $colors.each(function() {
      /I/.test($(this).text()) ? ($(this).show()) : ($(this).hide());
    });
  }
  else if ($('#design').val() === 'js puns') {
    $colors.each(function() {
      /Puns/.test($(this).text()) ? ($(this).show()) : ($(this).hide());
    });
  }
});




/********************************
Activities section
********************************/
const $totalContainer = $('#total-container');
let $total = $('#total');
// $('#total-container').hide();

const $main = $('.main-conf');

const checkConflict = function(workshop) {

}

const $fsdhjkfdshjk = $('input[disabled]'); // selects inputs with disabled attrinute


$($main).on('click', function() {
  console.log($main.val());
  $total.text($main.val());


});




/********************************
Payment section
********************************/
const $method = $('#payment');
const $credit = $('#credit-card');
const $paypal = $('#credit-card').next();
const $bitcoin = $('#credit-card').next().next();

// Show selected payment option
const newPayment = function(paymentSelected) {
  $($credit).hide();
  $($paypal).hide();
  $($bitcoin).hide();
  $(paymentSelected).show();
}

// Listen for changes to selected payment input
$($method).on('change', function() {
  switch ($($method).val()) {
    case 'credit card':
      newPayment($credit);
      break;
    case 'paypal':
      newPayment($paypal);
      break;
    case 'bitcoin':
      newPayment($bitcoin);
      break;
  }
});

// Hide payment methods on page load
newPayment();
