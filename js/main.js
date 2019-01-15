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

const $activities = $('.activities input');
// console.log($activities);


$activities.each(function(index, element) {
  // console.log(index, element);

  $(element).on('click', function() {
    console.log(index, element);
    index === 0 ? (console.log('Add $200')) : (console.log('Add $100'));




    // TODO: WITHIN THESE EVET LISTENERS, I HAVE ACCESS
    // TO THE INDEX OF EACH ACTIVITY WHICH I CAN USE
    // TO PASS TO THE THREE ASSISTING FUNCTIONS IDENTIFIED BELOW




    // If checked
      // If index===0
        // Add $200
      //If index!==0                  Create isIndexZero() function
        // Add $100                   Create an updateTotal() function
        // Check/Update conflicts     Create a checkConflicts() function


    // If unchecked
      // If index===0
        // Subtract $200
      // If index!==0
        // Subtract $100
        // Check/Update conflicts



  });

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
newPayment($credit);
