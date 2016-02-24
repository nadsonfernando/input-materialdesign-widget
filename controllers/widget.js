/** @author: Nádson Fernando
 *  @email: nadsonfernando1@gmail.com
 *  @description: controller input
 */

'use strict';

var args = arguments[0] || {};
var _init = {};
var _config = {
	color : {
		pattern : '#aaa',
		post : '#208FE5',
		exceedingColor : "FF0000"
	},
	duration : 200,
	editable : true,
	exceeding : false,
	up: false
};

var _events = {
	CLICK : 'click',
	FOCUS : 'focus',
	BLUR : 'blur',
	CHANGE : 'change'
};

var mask = {
	NUMBER : {
		type : 'number',
		exp : /^[0-9]+$/
	},
	CUSTOM : {
		exp : ''
	}
};

var _animation = {
	ANIMATION_UP : function() {
		if (!_config.editable)
			return;

		var color = _config.exceeding ? _config.color.exceeding : _config.color.post;
		$.hint.animate({
			"top" : 0,
			"color" : color,
			"transform" : Ti.UI.create2DMatrix().scale(0.7),
			"left" : Ti.Platform.osname == "android" ? (-configHintSize() + 2) : -configHintSize(), //Fix hint being cut off on Android
			"duration" : _config.duration
		});

		$.footer.animate({
			"backgroundColor" : color,
			"height" : 2
		});
		
		_config.up = true;
	},

	ANIMATION_DOWN : function() {
		if (!_config.editable) 
			return;

		var color = _config.exceeding ? _config.color.exceeding : _config.color.pattern;
		$.footer.animate({ 
			"backgroundColor" : color,  
			"height" : 1
		});

		var attrsHint = {
			"top" : $.textfield.top,
			"color" : color,
			"transform" : Ti.UI.create2DMatrix().scale(1),
			"left" : 0,
			"duration" : _config.duration
		};

		if ($.textfield.getValue()) {
			attrsHint["top"] = 0;
			attrsHint["transform"] = Ti.UI.create2DMatrix().scale(0.7);
			attrsHint["left"] = -configHintSize();
		}
		$.hint.animate(attrsHint);
		
		_config.up = false;
	}
};

function resetColorWarning() {
	_config.exceeding = false;
	$.footer.backgroundColor = _config.color.pattern;
	$.counter["color"] = _config.color.pattern;
	$.hint.color = _config.color.pattern;
}

function minMaxLength(event, footerText) {
	var eventSize = event.value.length;

	if (eventSize == 0 && !_config.up) {
		$.counter.animate({
			"right" : -64,
			"duration" : 350
		});
		resetColorWarning();

		return;

	} else if (eventSize == 1) {
		$.counter.animate({
			right : 0,
			duration : 350
		});
	}
	if (eventSize < _init.minLength || eventSize > _init.maxLength) 
		{
			footerText.setText(_init.footerText);
			exceeding();
		}
	 else 
	 	if ($.footer.backgroundColor != _config.color.post)
	 	{
	 		footerText.setText("");
			notExceeding();
	 	}
	
	if (_init.maxLength)
		$.counter.setText(eventSize + " / " + _init.maxLength);
	else
		$.counter.setText(eventSize + " / " + _init.minLength);
}

function exceeding() {
	_config.exceeding = true;

	$.footer.backgroundColor = _config.color.exceeding;
	$.counter["color"] = _config.color.exceeding;
	$.hint.color = _config.color.exceeding;
}

function notExceeding() {
	_config.exceeding = false;

	$.footer.backgroundColor = _config.color.post;
	$.counter["color"] = "#000";
	$.hint.color = _config.color.post;
}

function configHintSize() {
	var sizeHint = _.size($.hint.getText());
	sizeHint += sizeHint * (Number(sizeHint) > 25 ? 0.20 : 0.10);

	return sizeHint;
}

function validation(evt) {

	var value = $.textfield.getValue().toString();

	if (_init.toUpperCase)
		$.textfield.setValue(value.toUpperCase());

	if (_init.mask) {

		if (_init.mask == mask.NUMBER.type)
			$.textfield.setValue(regExp(value, mask.NUMBER.exp));
		else
			$.textfield.setValue(regExp(value, mask.CUSTOM.exp));
	}
}

function regExp(value, regExp) {
	var expression = value.match(regExp);
	return expression ? expression.toString() : "";
}

(function() {

	_config.color.post = args.colorFocus || _config.color.post;
	_config.color.pattern = args.colorPattern || _config.color.pattern;
	_config.color.exceeding = args.exceedingColor || "#FF0000";

	_config.duration = args.animationDuration || _config.duration;

	_init = {
		footerText: args.footerText,
		titleHint : args.titleHint,
		width : args.width,
		top : args.top,
		left : args.left,
		right : args.right,
		bottom : args.bottom,
		colorFont : args.colorFont,
		keyboardType : args.keyboardType,
		returnKey : args.returnKey,
		password : args.password,
		editable : args.editable,
		maxLength : args.maxLength,
		minLength : args.minLength,
		toUpperCase : args.toUpperCase,
		mask : args.mask,
		required : args.required || false
	};

	if ( typeof _init.editable == "string")
		_init.editable = eval(_init.editable);

	if (!_init.titleHint)
		$.hint.setVisible(false);

	/**
	 * attrs element {id} container
	 */
	if (_init.width)
		$.container.setWidth(_init.width);

	if (_init.top)
		$.container.setTop(_init.top);

	if (_init.bottom)
		$.container.setBottom(_init.bottom);

	if (_init.left)
		$.container.setLeft(_init.left);

	if (_init.right)
		$.container.setRight(_init.right);

	if (_init.colorFont)
		$.textfield.setColor(_init.colorFont);

	if (_init.keyboardType)
		$.textfield.setKeyboardType(_init.keyboardType);

	if (_init.returnKey)
		$.textfield.setReturnKeyType(_init.returnKey);

	if (_init.password)
		$.textfield.setPasswordMask(_init.password);

	if (_init.mask != mask.NUMBER.type)
		mask.CUSTOM.exp = eval(_init.mask);

	$.hint.setText(_init.titleHint);
	$.hint.setColor(_config.color.pattern);
	$.footer.setBackgroundColor(_config.color.pattern);

	if (_init.editable == false) {
		$.container.setOpacity(0.3);
		$.textfield.setEditable(false);

		_config.editable = false;
	}

	$.textfield.addEventListener(_events.FOCUS, _animation.ANIMATION_UP);
	$.textfield.addEventListener(_events.CHANGE, function(event) {
		validation(event);

		if (_init.required) {
			if ($.textfield.getValue()) {
				notExceeding();
				$.required.setText("");
			}
		}

		if (_init.maxLength || _init.minLength)
			minMaxLength(event, $.required);
	});
	$.textfield.addEventListener(_events.BLUR, function(event) {
		_animation.ANIMATION_DOWN(event);

		if (_init.maxLength || _init.minLength)
			{
				minMaxLength(event, $.required);
			}

		if (_init.required) {
			if (!$.textfield.getValue()) {
				exceeding();
				$.required.setText(_init.required);
			}
		}
	});
})();

exports.getValue = function() {
	return $.textfield.getValue();
};

exports.ANIMATION_UP = function() {
	_animation.ANIMATION_UP();
};

exports.ANIMATION_DOWN = function() {
	_animation.ANIMATION_DOWN();
};

exports.setValue = function(value, up) {
	if (up)
		_animation.ANIMATION_UP();

	$.textfield.setValue(value);
};

exports.listener = function(event, callback) {
	$.textfield.addEventListener(event, function(e) {
		callback(e);
	});
};

exports.blur = function(toFocus) {
	$.textfield.blur();
};

exports.focus = function() {
	$.textfield.focus();
};
