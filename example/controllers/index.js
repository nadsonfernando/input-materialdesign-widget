// On return Key from firstTextField
$.firstTextField.listener('return', function(e){
	$.secondTextField.focus();
});

// On blur Key from secondTextField
$.secondTextField.listener('blur', function(e){
	alert('You just Blur secondTextField' );
});

$.win.open();
