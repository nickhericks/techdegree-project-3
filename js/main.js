/********************************
Global variables
********************************/
const $name = $('#name');
const $email = $('#mail');
const $activities = $('input:checkbox');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');



/********************************
Basic Info section
********************************/
// Set focus to name field on page load
$($name).focus();

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
    // console.log($('#design').val());
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
let total = 0;
const conflicts = {
  '1': 3,
  '3': 1,
  '2': 4,
  '4': 2,
}

const $totalDiv = $(`<div>Total: $<span class="totalSpan"></span></div>`);
$('.activities').append($totalDiv);
$($totalDiv).addClass('total').hide();

// Check for conflicting activities
const checkConflicts = function(index, activity) {
  // If a conflict exists
  if(index in conflicts) {

    // Find conflicting activity index
    const conflictIndex = conflicts[index]

    // If activity is checked, disable conflicting activity
    if (activity.checked) {
      $($activities[conflictIndex]).prop("disabled", true);
      $('.activities label').eq(conflictIndex).addClass("conflict");
    }

    // If activity is de-selected, re-enable conflicting activity
    else {
      $($activities[conflictIndex]).prop("disabled", false);
      $('.activities label').eq(conflictIndex).removeClass("conflict");
    }
  }
}

// Update total cost of activities
const updateTotal = function(index, activity) {
  let adjustment = index===0 ? (200) : (100);
  // If activity is checked, add amount, if unchecked, subtract amount
  activity.checked ? (total += adjustment) : (total -= adjustment);

  $('.totalSpan').text(total);

  total === 0 ? ($($totalDiv).hide()) : ($($totalDiv).show());
}

// Create event listener for each activity
$activities.each(function(index, activity) {
  $(activity).on('change', function() {
    checkConflicts(index, activity);
    updateTotal(index, activity);
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



/********************************
Form submit
********************************/

$('#name').prev().after(`<div id="nameError" class="error-message">Please enter your name</div>`);
const $nameError = $('#nameError');
$('#nameError').hide();

$('#mail').prev().after(`<div id="emailError" class="error-message">Please enter a valid email address</div>`);
const $emailError = $('#emailError');
$('#emailError').hide();



$('button').attr('');

$('button').on('click', function(event) {
  event.preventDefault();
  formIsValid();
});

//
// NEED TO UPDATE EVENT LISTENER TO SOMETHING ELSE.
// RIGHT NOW THIS SHOWS ERROR WHEN YOU TAB TO A FIELD.
// OR MAYBE I JUST REMOVE IMMEDIATE VALIDATION ON ALL FIELDS EXCEPT NAME
//

// Checks name field validation and hides or shows error
$($name).on('keyup', function() {
  validName();
});

// Checks email field validation and hides or shows error
$($email).on('keyup', function() {
  validEmail();
});

// Displays error border and message
const showError = function(field, message) {
  $(field).addClass('error-border');
  $(message).show();
}

// Removes error border and message
const removeError = function(field, message) {
  $(field).removeClass('error-border');
  $(message).hide();

}

/********************************
Form Validation
********************************/

const validName = function() {
  const nameIsValid = /.*\S.*/.test($($name).val());
  // If name is valid, hide errors, else show errors
  nameIsValid ? (removeError($($name), $nameError)) : (showError($($name), $nameError));
  // Return true if valid
  return nameIsValid;
}

//
// NEED TO UPDATE EMAIL VALIDATION
// NEED TO UPDATE EMAIL VALIDATION
// NEED TO UPDATE EMAIL VALIDATION
//

const validEmail = function() {
  const emailIsValid = /.*\S.*/.test($($email).val());
  // If name is valid, hide errors, else show errors
  emailIsValid ? (removeError($('#mail'), $emailError)) : (showError($('#mail'), $emailError));
  // Return true if valid
  return emailIsValid;
}

// Run this function when form is submitted
const formIsValid = function() {
  // console.log(`Name field is valid: ${validName()}`);
  // console.log(`Email field is valid: ${validEmail()}`);

  // Add other validation functions with '&&' below
  if (validName() && validEmail()) {
    console.log(`true`);
    return true;
  }
  else {
    console.log(`false`);
    return false;
  }

}

// formIsValid();
