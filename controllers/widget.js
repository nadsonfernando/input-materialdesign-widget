/** @author: Nádson Fernando 
 *  @email: nadsonfernando1@gmail.com 
 *  @description: controller input
 *  @version: 1.0 
 */

//arguments
var args = arguments[0] || {};

//config references this
var _config = {
	color : {
		pattern : '#aaa',
		post : '#208FE5',
		exceedingColor : "FF0000"
	},
	duration : 200,
	editable: true,
	exceeding: false
};

//declare events in object
var _events = {
	CLICK : 'click',
	FOCUS : 'focus',
	BLUR : 'blur',
	CHANGE : 'change'
};

var _animation = {
	
	//animation up
	ANIMATION_UP : function() {
		if(!_config.editable) 
			return;
		
		var lenHint = _.size($.hint.getText());
		var color = _config.exceeding ? _config.color.exceeding : _config.color.post;
		lenHint += lenHint * (Number(lenHint) > 25 ? 0.20 : 0.10);
		

		$.hint.animate({
			"top" : 0,
			"color" : color,
			"transform" : Ti.UI.create2DMatrix().scale(0.7),
			"left" : Ti.Platform.osname == "android" ? (-lenHint + 2) : -lenHint, //Fix hint being cut off on Android
			"duration" : _config.duration
		});

		$.footer.animate({
			"backgroundColor" : color,
		});
	},
	
	//animation down
	ANIMATION_DOWN : function() {
		if(!_config.editable) 
			return;
		
		var lenHint = _.size($.hint.getText());
		var color = _config.exceeding ? _config.color.exceeding : _config.color.pattern;
		lenHint += lenHint * (Number(lenHint) > 25 ? 0.20 : 0.10);
		
		$.footer.animate({
			"backgroundColor" : color
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
			attrsHint["left"] = -lenHint;
		}
		$.hint.animate(attrsHint);
	}
};

//Exports Methods
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

exports.blur = function( toFocus ){
	$.textfield.blur();
};

exports.focus = function(){
	$.textfield.focus();
};

$.textfield.addEventListener(_events.FOCUS, _animation.ANIMATION_UP);
$.textfield.addEventListener(_events.BLUR, _animation.ANIMATION_DOWN);

(function() {

	_config.color.post = args.colorFocus || _config.color.post;
	_config.color.pattern = args.colorPattern || _config.color.pattern;
	_config.color.exceeding = args.exceedingColor || "#FF0000"; //red
	
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
		password: args.password,
		editable: args.editable,
		maxLength: args.maxLength,
		minLength: args.minLength
	};
	
	if(typeof _init.editable == "string")
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

	if(_init.keyboardType)
		$.textfield.setKeyboardType(_init.keyboardType);

	if(_init.returnKey)
		$.textfield.setReturnKeyType(_init.returnKey);

	if(_init.password)
		$.textfield.setPasswordMask(_init.password);

	$.hint.setText(_init.titleHint);
	$.hint.setColor(_config.color.pattern);
	$.footer.setBackgroundColor(_config.color.pattern);
	
	if(_init.editable == false) {
		$.container.setOpacity(0.3);
		$.textfield.setEditable(false);
		
		_config.editable = false;
	}
	
	if(_init.maxLength > 0) {
		
		//Create counter label
		var counter = Ti.UI.createLabel({
			height: 		15,
			width: 			64,
			font: {
				fontSize: 	11
			},
			opacity: 		0.7,
			right: 			-64, //Stay out of the screen on init, will animate in upon change event
			textAlign: 		"right",
			bottom: 		0
		});
		$.container.add(counter);
		
		//Add on change event listener
		$.textfield.addEventListener(_events.CHANGE, function(event){
			var length = event.value.length;
			
			//Animate check
			if(length == 0){
				counter.animate( { right:-64, duration:350}); //Animate out
				return;
			}else if(length == 1)
				counter.animate( { right:0, duration:350}); //Animate in
				
			//Check minLength value or maxLength value
			if(length < _init.minLength || length > _init.maxLength){
				
				//Set flag for next focus / blur event
				_config.exceeding = true;
				
				//Set exceeding color
				$.footer.backgroundColor = _config.color.exceeding;
				counter.color = _config.color.exceeding;
				$.hint.color = _config.color.exceeding;
				
			}else if($.footer.backgroundColor != _config.color.post){
				
				//Set flag for next focus / blur event
				_config.exceeding = false;
				
				//Reset to color back to normal1			
				$.footer.backgroundColor = _config.color.post;
				counter.color = "#000";
				$.hint.color = _config.color.post;
			}
			
			//Update label
			counter.setText(length + " / " + _init.maxLength);
		});
	}
})();