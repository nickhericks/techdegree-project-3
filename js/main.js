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

$($name).prev().after(`<div id="nameError" class="error-message">Please enter your name</div>`);
const $nameError = $('#nameError');
$('#nameError').hide();

$($email).prev().after(`<div id="emailError" class="error-message">Please enter a valid email address</div>`);
const $emailError = $('#emailError');
$('#emailError').hide();

$($activities).parent().parent().prepend(`<div id="activityError" class="error-message">Please select at least one activity</div>`);
const $activityError = $('#activityError');
$('#activityError').hide();

$($cvv).parent().parent().prepend(`<div id="cvvError" class="error-message">CVV must be 3 digits long.</div>`);
const $cvvError = $('#cvvError');
$('#cvvError').hide();

$($zip).parent().parent().prepend(`<div id="zipError" class="error-message">Zip code must be 5 digits long.</div>`);
const $zipError = $('#zipError');
$('#zipError').hide();

$($ccNum).parent().parent().prepend(`<div id="missingCcNumError" class="error-message">Please enter a credit card number</div>`);
const $missingCcNumError = $('#missingCcNumError');
$('#missingCcNumError').hide();

$($ccNum).parent().parent().prepend(`<div id="ccNumError" class="error-message">Card number must be between 13 and 16 digits long.</div>`);
const $ccNumError = $('#ccNumError');
$('#ccNumError').hide();





// When submit button is clicked
$('button').on('click', function(event) {
  event.preventDefault();
  formIsValid();

  //
  //
  // Decide how to handle form submition and resetting the page
  //
  //
  //
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
  $(message).slideUp(1000);
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
  // console.log(`Name field is valid: ${validName()}`);
  // console.log(`Email field is valid: ${validEmail()}`);
  // console.log(`Activity field is valid: ${validActivity()}`);
  // console.log(`Payment field is valid: ${validPayment()}`);
  validName();
  validEmail();
  validActivity();
  validPayment();
  // Add other validation functions with '&&' below
  if (validName() && validEmail() && validActivity() && validPayment()) {
    console.log(`true`);
    return true;
  }
  else {
    console.log(`false`);
    return false;
  }

}

// formIsValid();
