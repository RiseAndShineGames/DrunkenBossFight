"use strict";

module.exports = function(ecs, data) {
	
	ecs.add(function(entity, elapsed) { // jshint ignore:line
		if(data.input.mouse.consumePressed(0)){

			data.switchScene("main");
		}
	});
};
