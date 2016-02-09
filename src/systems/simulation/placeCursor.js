"use strict";

module.exports = function(ecs, data) {
	
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
		var size = data.entities.get(entity, "size");
		data.entities.set(entity, "position", {
			"x": data.input.mouse.x - size.width/2,
			"y": data.input.mouse.y - size.height/2
		});
	}, "cursor");
};