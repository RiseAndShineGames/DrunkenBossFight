"use strict";

module.exports = function(data) { // eslint-disable-line no-unused-vars
	var skyline = 9;
	var sPos = data.entities.get(skyline,"position");
	var sSize = data.entities.get(skyline,"size");

	sPos.y = data.canvas.height - 0.99*sSize.height;
};
