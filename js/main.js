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
const $activities = $('input:checkbox');
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
$('button').attr('');

$('button').on('click', function(event) {
  event.preventDefault();

  // if(noErrors) {
  //   resetForm();
  // }
});
