"use strict";

module.exports = function(data) { // eslint-disable-line no-unused-vars
	var home = 250;
	var position = data.entities.get(home,"position");
	var size = data.entities.get(home,"size");

	position.y = data.canvas.height *0.7
	position.x = data.canvas.width/2 -size.width*0.9
};
