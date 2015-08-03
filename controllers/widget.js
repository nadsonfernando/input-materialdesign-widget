/** @author: Nádson Fernando 
 *  @email: nadsonfernando1@gmail.com 
 *  @description: controller input
 *  @version: 1.0 
 */

@param {Number }animationDuration
@param {String, Number} width
@param {String } colorFocus
@param {String} colorPattern
@param {String} colorFont
@param {String} titleHint
@param {String, Number} top
@param {String, Number} bottom 
@param {String, Number} left 
@param {String, Number} right 
@param {String} keyboardType 
@param {String} returnKey 
@param {Boolean} password  
var args = arguments[0] || {};

@Object _config
@attrs
@Object color
@String pattern
@String post
@Number duration    
var _config = {
	color : {
		pattern : '#aaa',
		post : '#208FE5'
	},
	duration : 200
};

@Object _events
@String CLICK
@String FOCUS
@String BLUR
var _events = {
	CLICK : 'click',
	FOCUS : 'focus',
	BLUR : 'blur'
};

@Object _animation
var _animation = {
	
	@Method ANIMATION_UP
	// Animate up
	ANIMATION_UP : function() {

		var lenHint = _.size($.hint.getText());
		lenHint += lenHint * 0.50;

		$.hint.animate({
			"top" : 0,
			"color" : _config.color.post,
			"transform" : Ti.UI.create2DMatrix().scale(0.7),
			"left" : -lenHint,
			"duration" : _config.duration
		});

		$.footer.animate({
			"backgroundColor" : _config.color.post,
		});
	},
	
	@Method ANIMATION_DOWN
	// Animate down	
	ANIMATION_DOWN : function() {

		var lenHint = _.size($.hint.getText());
		lenHint += lenHint * 0.50;

		$.footer.animate({
			"backgroundColor" : _config.color.pattern,
		});

		var attrsHint = {
			"top" : 30,
			"color" : _config.color.pattern,
			"transform" : Ti.UI.create2DMatrix().scale(1),
			"left" : 0,
			"duration" : _config.duration
		};

		if ($.textfield.getValue()) {

			attrsHint["top"] = 0;
			attrsHint["transform"] = Ti.UI.create2DMatrix().scale(0.7);
			attrsHint["left"] = -lenHint;
		}

		$.hint.animate(attrsHint);

	}
};


@exports Method getValue
@return Number
exports.getValue = function() {
	return $.textfield.getValue();
};

@exports Method ANIMATION_UP
exports.ANIMATION_UP = function() {
	_animation.ANIMATION_UP();
};

@exports Method ANIMATION_DOWN
exports.ANIMATION_DOWN = function() {
	_animation.ANIMATION_DOWN();
};

@exports Method setValue
exports.setValue = function(value, up) {
	if (up)
		_animation.ANIMATION_UP();

	$.textfield.setValue(value);
};

@exports Method listener
exports.listener = function(event, callback) {
	$.textfield.addEventListener(event, function(e) {
		callback(e);
	});
};

@exports Method blur
exports.blur = function( toFocus ){
	$.textfield.blur();
};

@exports Method focus
exports.focus = function(){
	$.textfield.focus();
};

//Listener event
$.textfield.addEventListener(_events.FOCUS, _animation.ANIMATION_UP);
$.textfield.addEventListener(_events.BLUR, _animation.ANIMATION_DOWN);

@init
(function() {

	_config.color.post = args.colorFocus || _config.color.post;
	_config.color.pattern = args.colorPattern || _config.color.pattern;
	
	_config.duration = args.animationDuration || _config.duration;

	var _init = {
		titleHint : args.titleHint,
		width : args.width,
		top : args.top,
		left : args.left,
		right : args.right,
		bottom : args.bottom,
		colorFont : args.colorFont,
		keyboardType: args.keyboardType,
		returnKey: args.returnKey,
		password: args.password
	};

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

	if(_init.keyboardType)
		$.textfield.setKeyboardType(_init.keyboardType);

	if(_init.returnKey)
		$.textfield.setReturnKeyType(_init.returnKey);

	if(_init.password)
		$.textfield.setPasswordMask(_init.password);

	$.hint.setText(_init.titleHint);
	$.hint.setColor(_config.color.pattern);
	$.footer.setBackgroundColor(_config.color.pattern);

})();

