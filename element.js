// Element helper
const el = selector => {
	let self = {};
	self.selector = selector;
	self.element = document.querySelector(self.selector);

	// Create new element
	self.new = attr => {
		self.element = document.createElement(self.selector);
		if(attr) {
			for (var key in attr) {
				if(attr.hasOwnProperty(key)) {
					self.element.setAttribute(key, attr[key]);
				}
			}
		}
		return self;
	}

	self.node = () => {
		return self.element;
	}

	self.all = () => {
		return document.querySelectorAll(self.selector);
	}

	self.css = () => {
		return self.node().classList;
	}

	// HTML content
	self.html = content => {
		if(content === null) return self.element;
		self.element.innerHTML = content;
		return self;
	}

	// Append element
	self.append = element => {
		element.appendChild(self.element);
		return self;
	}

	return self;
}
