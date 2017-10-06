/* @Autor::Nadson Fernando Silva de Oliveira @Email::nadsonfernando1@gmail.com*/

'use strict';

var _EVENTSINTERACTION,
    _PROPERTIES,
    _ANIMATION,
    _EVENTS = {};

exports.getValue = getValue;
exports.ANIMATION_UP = _upInteraction;
exports.ANIMATION_DOWN = _blurInteraction;
exports.setValue = setValue;
exports.listener = listener;
exports.blur = blur;
exports.focus = focus;
exports.clickIconAction = clickIconAction;
exports.setPasswordMask = setPasswordMask;
exports.setIconAction = setIconAction;

function _getController(controller) {
	return Widget.createController(controller);
}

function castBooleanForce(value) {
	return Boolean(eval(value));
}

function _upInteraction() {
	var _configuration = _PROPERTIES.get();

	if (!castBooleanForce(_configuration.control.isEditable))
		return;

	var color = _PROPERTIES.get('color');

	if (castBooleanForce(_configuration.control.isExceeding))
		color = _configuration.color.exceeding;

	if (!castBooleanForce(_configuration.control.isExceeding))
		color = _configuration.color.focus;

	var pathAnimation = 'animation.up.footer';

	if ($.args.animationType)
		pathAnimation += '.' + $.args.animationType;

	var footerProps = _PROPERTIES.get(pathAnimation);
	_PROPERTIES.set(pathAnimation + '.backgroundColor', color, true);

	_.defer(function() {
		_ANIMATION.animate($.footer, footerProps);
	});

	_PROPERTIES.set('animation.up.hint.color', color, true);
	_PROPERTIES.set('animation.up.hint.left', OS_ANDROID ? (-calculateHintSize() + 2) : -calculateHintSize(), true);
	_PROPERTIES.set('animation.up.hint.duration', _configuration.animationDuration, true);

	var hintProps = _PROPERTIES.get('animation.up.hint');
	hintProps.transform = Ti.UI.create2DMatrix({
		scale : 0.7
	});
	_.defer(function() {
		_ANIMATION.animate($.hint, hintProps);
	});

	_PROPERTIES.set("control.isUp", true, true);
}

function _changeInteraction(event) {
	var _configuration = _PROPERTIES.get();
	var value = $.textfield.getValue().toString();

	if (castBooleanForce(_configuration.toUpperCase)) {
		$.textfield.setValue(value.toUpperCase());
	}
	if (_configuration.required) {
		if ($.textfield.getValue()) {
			$.required.setText("");
			controllExceeding(false);
		}
	}
	changeMask(event);
	if (_configuration.maxLength)
		minMaxLength(event, _configuration);
}

function _blurInteraction(event) {
	var _configuration = _PROPERTIES.get();

	if (!castBooleanForce(_configuration.control.isEditable))
		return;

	var color = _PROPERTIES.get('color');

	if (castBooleanForce(_configuration.control.isExceeding))
		color = _configuration.color.exceeding;

	if (!castBooleanForce(_configuration.control.isExceeding))
		color = _configuration.color.default;

	var pathAnimation = 'animation.down.footer';

	if ($.args.animationType)
		pathAnimation += '.' + $.args.animationType;

	var footerProps = _PROPERTIES.get(pathAnimation);
	_PROPERTIES.set(pathAnimation + '.backgroundColor', color, true);

	_.defer(function() {
		_ANIMATION.animate($.footer, footerProps, postionOverrideFooterAnimation);
	});

	var attrsHint = {
		top : $.textfield.getTop(),
		color : color,
		transform : Ti.UI.create2DMatrix().scale(1),
		left : 0,
		duration : _configuration.animationDuration
	};

	if ($.textfield.getValue()) {
		attrsHint.top = 0;
		attrsHint.transform = Ti.UI.create2DMatrix().scale(0.7);
		attrsHint.left = -calculateHintSize();
	}
	_ANIMATION.animate($.hint, attrsHint);
	_PROPERTIES.set("control.isUp", false, true);

	if (_configuration.maxLength)
		minMaxLength(event, _configuration);

	if (_configuration.required) {
		if (!$.textfield.getValue()) {
			$.required.setText(_configuration.required);
			controllExceeding(false);
		}
	}
}

function changeMask(event) {
	var source = event.source;
	var regExp;
	var messageDefault = '';

	if ($.args.maskTypeOverride) {
		source.value = source.value.replace($.args.maskTypeOverride, '');
		return;
	}

	switch($.args.maskType) {
		case 'number':
			regExp = /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/;
			messageDefault = "Number invalid";
			break;
	
		case 'email':
			regExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
			messageDefault = "E-mail invalid";
			break;
		}

	if (!regExp.test(source.value)) {
		$.required.setText(messageDefault || $.args.maskTypeDescription);
	} else {
		$.required.setText("");
	}

	if (!_.size(source.value))
		$.required.setText("");
}

function resetColorWarning() {
	var _configuration = _PROPERTIES.get();

	_PROPERTIES.set('control.isExceeding', false, true);
	$.footer.setBackgroundColor(_configuration.color.default);
	$.counter.setColor(_configuration.color.default);
	$.hint.setColor(_configuration.color.default);
}

function minMaxLength(event, properties) {
	var _configuration = properties;

	var eventSize = event.value.length;
	if (eventSize == 0 && !castBooleanForce(_configuration.control.isUp)) {
		_ANIMATION.animate($.counter, _configuration.animation.minMaxSizeTo);
		resetColorWarning();
		return;

	} else if (eventSize == 1) {
		_ANIMATION.animate($.counter, _configuration.animation.minSizeMaxBack);
	}
	if (eventSize < _configuration.minLength || eventSize > _configuration.maxLength)
		controllExceeding(true);
	else if ($.footer.getBackgroundColor() != _configuration.color.focus)
		controllExceeding(false);

	$.counter.setText(eventSize + " / " + _configuration.maxLength);
}

function controllExceeding(isExceeding) {
	var _configuration = _PROPERTIES.get();
	_PROPERTIES.set('control.isExceeding', eval(isExceeding), true);

	var colorExceedind = castBooleanForce(isExceeding) ? _configuration.color.exceeding : _configuration.color.focus;

	$.footer.setBackgroundColor(colorExceedind);
	$.counter.setColor(colorExceedind);
	$.hint.setColor(colorExceedind);
}

function calculateHintSize() {
	var sizeHint = _.size($.hint.getText());
	sizeHint += sizeHint * (Number(sizeHint) > 25 ? 0.2 : 0.1);

	return sizeHint;
}

function contructorElement() {
	var _configuration = _PROPERTIES.get();

	_configuration.width && $.container.setWidth(_configuration.width);
	_configuration.top && $.container.setTop(_configuration.top);
	_configuration.bottom && $.container.setBottom(_configuration.bottom);
	_configuration.left && $.container.setLeft(_configuration.left);
	_configuration.right && $.container.setRight(_configuration.right);
	_configuration.colorFont && $.textfield.setColor(_configuration.colorFont);
	_configuration.keyboardType && $.textfield.setKeyboardType(_configuration.keyboardType);
	_configuration.returnKey && $.textfield.setReturnKeyType(_configuration.returnKey);
	_configuration.password && $.textfield.setPasswordMask(_configuration.password);
	_configuration.colorDefault && $.hint.setColor(_configuration.colorDefault);
	_configuration.colorDefault && $.footer.setBackgroundColor(_configuration.colorDefault);
	_configuration.titleHint && $.hint.setText(_configuration.titleHint);
	_configuration.titleHintVisible && $.hint.setVisible(_configuration.titleHintVisible);

	_configuration.colorFocus && _PROPERTIES.set("color.focus", _configuration.colorFocus, true);
	_configuration.colorDefault && _PROPERTIES.set("color.default", _configuration.colorDefault, true);
	_configuration.colorExceeding && _PROPERTIES.set("color.exceeding", _configuration.colorDefault, true);

	$.hint.setColor(_configuration.color.default);
	$.footer.setBackgroundColor(_configuration.color.default);
	$.iconAction.setColor(_configuration.color.default);

	if (!castBooleanForce(_configuration.control.isEditable)) {
		$.container.setOpacity(0.3);
		$.textfield.setEditable(false);
	}

	postionOverrideFooterAnimation();

	if (!_.isUndefined($.args.iconAction)) {
		$.iconAction.setVisible(true);
		setIconAction($.args.iconAction);
	}
}

function postionOverrideFooterAnimation() {
	switch($.args.animationType) {
		case 'leftToRight':
		case 'leftToRightToRightOut':
			$.footer.setRight("100%");
			break;
		case 'expand':
			$.footer.setWidth(0.1);
			break;	
	}
}

(function(args) {
	_EVENTSINTERACTION = _getController('_eventsInteraction');
	_PROPERTIES = _getController('_properties');
	_ANIMATION = _getController('_animation');
	_PROPERTIES.apply(args);
	_PROPERTIES.set('animation', _ANIMATION.getPropertiesConfig());

	contructorElement(args);

	_EVENTS = _PROPERTIES.get('EVENTS');
	_EVENTSINTERACTION.listener($.textfield, _EVENTS.FOCUS, _upInteraction);
	_EVENTSINTERACTION.listener($.textfield, _EVENTS.CHANGE, _changeInteraction);
	_EVENTSINTERACTION.listener($.textfield, _EVENTS.BLUR, _blurInteraction);
}($.args));

function getValue() {
	return $.textfield.getValue();
}

function setValue(value, uping) {
	if (uping)
		_upInteraction();
	$.textfield.setValue(value);
}

function listener(event, callback) {
	$.textfield.addEventListener(event, function(e) {
		callback(e);
	});
};
function blur(toFocus) {
	$.textfield.blur();
};
function focus() {
	$.textfield.focus();
};
function clickIconAction(_callbackIconAction) {
	if (!$.args.iconAction)
		return;

	_EVENTSINTERACTION.listener($.iconAction, _EVENTS.CLICK, _callbackIconAction);
}

function setPasswordMask(value) {
	$.textfield.setPasswordMask(value);
}

function setIconAction(value) {
	$.iconAction.setText(value);
}