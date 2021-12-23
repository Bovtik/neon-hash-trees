var emit = function emit (eventName, data, target) {
	if (!target) target = document;
	var event = new CustomEvent(eventName, {detail: data});
	target.dispatchEvent(event);
}