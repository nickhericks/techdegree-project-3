
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
