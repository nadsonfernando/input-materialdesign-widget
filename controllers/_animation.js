var __animation_to = {};

exports.animate = animate;
exports.getPropertiesConfig = getPropertiesConfig;

function animate(element, propertiesTo, callComplete) {
	var _a = Ti.UI.createAnimation(propertiesTo);
	element.animate(_a);
	callComplete && _a.addEventListener('complete', callComplete);
}
function getPropertiesConfig() {
	return __animation_to;
}

__animation_to = {
	up : {
		footer : {
			height : 2,
			leftToRight: {
				right: 0,
				height: 2
			},
			leftToRightToRightOut: {
				right: 0,
				height: 2
			},
			expand: {
				width: '100%',
				height: 2
			}
		},
		hint : {
			top : 0
		}
	},
	down : {
		footer : {
			height : 1,
			leftToRight: {
				right: '100%',
				height: 2
			},
			leftToRightToRightOut: { 
				right: '-100%',
				height: 2
			},
			expand: {
				width: 0,
				height: 2
			}
		}
	},
	minMaxSizeTo : {
		right : -64,
		duration : 350
	},
	minSizeMaxBack : {
		right : 0,
		duration : 350
	}
};

