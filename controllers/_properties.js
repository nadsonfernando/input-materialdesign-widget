var _properties = {};

exports.apply = apply;
exports.get = get;
exports.set = set;

function configutarionProperties(list, properties) {
	for (var key in list) {
		var element = get(list[key], properties);
		if (_.isNull(element) || _.isUndefined(element))
			continue;

		set(list[key], element, true);
	}
}
function apply(properties) {
	properties = properties || {};

	var list__verif = [
		'titleHint', 
		'width', 
		'top', 
		'bottom', 
		'keyboardType', 
		'returnKey', 
		'password', 
		'editable', 
		'maxLength', 
		'minLength', 
		'toUpperCase', 
		'required', 
		'colorFocus', 
		'colorDefault', 
		'colorExceeding', 
		'colorFont', 
		'colorExceeding', 
		'animationDuration', 
		'left', 
		'right', 
		'titleHintVisible'];

	configutarionProperties(list__verif, properties);
}
function get(attr, _obj) {
	var _objFind = _properties;

	if (!_.isNull(_obj) && !_.isUndefined(_obj))
		_objFind = _obj;

	if (_.isNull(attr) || _.isUndefined(attr))
		return _objFind;

	return new Function('o', 'return o.'+ attr)(_objFind);
};
function set(path, value, isSetGrafhicFunction) {
	if (isSetGrafhicFunction) {
		new Function('o', 'o.'+ path + ' = ' + "'"+ value +"'")(_properties);
		return;
	}
	_properties[path] = value;
}

_properties = {
	animationDuration : 200,
	position : {
		left : '15dp',
		right : '15dp'
	},
	color : {
		default : '#AAA',
		focus : '#208FE5',
		exceeding : '#FF0000',
	},
	control : {
		isEditable : true,
		isExceeding : false,
		isUp : false
	},
	EVENTS : {
		CLICK : 'click',
		FOCUS : 'focus',
		BLUR : 'blur',
		CHANGE : 'change'
	}
};

