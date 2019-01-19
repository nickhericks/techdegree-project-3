/********************************
Global variables
********************************/
const $form = $('form');
const $name = $('#name');
const $email = $('#mail');
const $activities = $('input:checkbox');
const $ccNum = $('#cc-num');
const $zip = $('#zip');
const $cvv = $('#cvv');

let total = 0;
const conflicts = {
  '1': 3,
  '3': 1,
  '2': 4,
  '4': 2,
}

// Error messages
const $mainError = $(`<div class="error-message">Form not submitted. Please provide the information requested in the red boxes below.</div>`);
const $nameError = $(`<div class="error-message">Please enter your name</div>`);
const $emailError = $(`<div class="error-message">Please enter a valid email address</div>`);
const $activityError = $(`<div class="error-message">Please select at least one activity</div>`);
const $cvvError = $(`<div class="error-message">CVV must be 3 digits long.</div>`);
const $zipError = $(`<div class="error-message">Zip code must be 5 digits long.</div>`);
const $missingCcNumError = $(`<div class="error-message">Please enter a credit card number</div>`);
const $ccNumError = $(`<div class="error-message">Card number must be between 13 and 16 digits long.</div>`);

// Append all error messages on page load
$($form).prepend($mainError);
$($name).prev().after($nameError);
$($email).prev().after($emailError);
$($activities).parent().parent().prepend($activityError);
$($cvv).parent().parent().prepend($cvvError);
$($zip).parent().parent().prepend($zipError);
$($ccNum).parent().parent().prepend($missingCcNumError);
$($ccNum).parent().parent().prepend($ccNumError);

// Hide all error messages on page load
$($mainError).hide();
$($nameError).hide();
$($emailError).hide();
$($activityError).hide();
$($cvvError).hide();
$($zipError).hide();
$($missingCcNumError).hide();
$($ccNumError).hide();




/********************************
Basic Info
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
  }
  else {
    $('#colors-js-puns').fadeOut();
  }

  if($('#design').val() === 'heart js') {
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












const resetFormFields = function() {
  $($name).val('');
  $($email).val('');
  $('#title').val('full-stack js developer')
  $('#other-title').val('')
  $('#other').hide();
  $('#size').val('medium')
  $('#design').val('select')
  $('#color').val('select')
  $('#colors-js-puns').hide()
  $($activities).each(function(index) {
    $activities[index].checked = false;
    $($activities[index]).prop("disabled", false);
    $('.activities label').eq(index).removeClass("conflict");
  });
  total = 0;
  $($totalDiv).hide()
  $('#payment').val('select_method')
  $($ccNum).val('')
  $($zip).val('')
  $(cvv).val('')
  $('#exp-month').val('1')
  $('#exp-year').val('2016')
}


// When submit button is clicked
$('button').on('click', function(event) {
  event.preventDefault();
  window.scrollTo(0, 0);
  // Return true if all form fields are valid
  formIsValid();
  if( formIsValid() ) {
    // Clear all fields on form submit
    resetFormFields();
  }
});



// Checks email field validation and hides or shows error
$($email).on('keyup', function(e) {
  if (e.keyCode !== 9) {
    validEmail();
  }
});

// Displays error border and message
const showError = function(field, message) {
  $(field).addClass('error-border');
  $(message).slideDown(1000);
}

// Removes error border and message
const removeError = function(field, message) {
  $(field).removeClass('error-border');
  $(message).hide();
}

/********************************
Form Validation
********************************/

// Check name value, show appropriate errors and return true if no errors
const validName = function() {
  const nameIsValid = /.*\S.*/.test($($name).val());
  // If name is valid, hide errors, else show errors
  nameIsValid ? (removeError($($name), $nameError)) : (showError($($name), $nameError));
  // Return true if valid
  return nameIsValid;
}

// Check email value, show appropriate errors and return true if no errors
const validEmail = function() {
  const emailIsValid = /^[^@]+@[^@]+\.[a-z]+$$/i.test($($email).val());
  // If name is valid, hide errors, else show errors
  emailIsValid ? (removeError($($email), $emailError)) : (showError($($email), $emailError));
  // Return true if valid
  return emailIsValid;
}

// Check activity total value, show appropriate errors and return true if no errors
const validActivity = function() {
  let activityIsValid = false;
  total ? (activityIsValid = true) : (activityIsValid = false);
  activityIsValid ? (removeError($($activities), $activityError)) : (showError($($activities), $activityError));
  return activityIsValid;
}

// Check payment fields, show appropriate errors and return true if no errors
const validPayment = function() {
  // Check credit card number value, show appropriate errors and return true if no errors
  const validCardNumber = function() {
    let $ccNumValue = $($ccNum).val();
    const ccNumIsValid = /^\d{13,16}$/.test($ccNumValue);
    // If no credit card number is entered, display missingCcNumError message
    if($ccNumValue.length === 0) {
      removeError($($ccNum), $ccNumError);
      showError($($ccNum), $missingCcNumError);
    }
    // Else check if value is valid
    else {
      removeError($($ccNum), $missingCcNumError)
      ccNumIsValid ? (removeError($($ccNum), $ccNumError)) : (showError($($ccNum), $ccNumError));
    }
    return ccNumIsValid;
  }

  // Check zip code value, show appropriate errors and return true if no errors
  const validZip = function() {
    const zipIsValid = /^\d{5}$/.test($($zip).val());
    zipIsValid ? (removeError($($zip), $zipError)) : (showError($($zip), $zipError));
    return zipIsValid;
  }

  // Check cvv value, show appropriate errors and return true if no errors
  const validCvv = function() {
    const cvvIsValid = /^\d{3}$/.test($($cvv).val());
    cvvIsValid ? (removeError($($cvv), $cvvError)) : (showError($($cvv), $cvvError));
    return cvvIsValid;
  }

  // Check if 'credit card' is selected as payment method
  if ($($method).val() !== 'credit card') {
    // Return true if 'credit card' is not selected
    return true;
  }
  else {
    // If 'credit card' is selected, run payment validation functions
    validCardNumber();
    validZip();
    validCvv();
    // If all payment fields are valid, return true
    if(validCardNumber() && validZip() && validCvv()) {
      return true;
    }
    else {
      return false;
    }
  }
}

// Run this function when form is submitted
const formIsValid = function() {
  validName();
  validEmail();
  validActivity();
  validPayment();
  // Add other validation functions with '&&' below
  if (validName() && validEmail() && validActivity() && validPayment()) {
    $($mainError).hide();
    return true;
  }
  else {
    $($mainError).slideDown(1000);
    return false;
  }
}
