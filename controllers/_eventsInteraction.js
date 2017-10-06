exports.listener = listener;

function listener(element, nameEvent, callback) {
	element.addEventListener(nameEvent, callback);
}

