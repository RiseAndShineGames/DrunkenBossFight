"use strict";

module.exports = function(ecs, data) {
	
	ecs.addEach(function(entity, elapsed) { // jshint ignore:line
	var collisions = data.entities.get(entity, "collisions");
	var cursor = 300;
	for ( var i = 0; i < collisions.length; i++ ) {
		if (collisions[i] == cursor) {
			if(data.input.mouse.consumePressed(0)){
				data.switchScene("intro");
			}
			var image = data.entities.get(entity, "image");
			image.sourceX = 320;
			return ;
		}
	}	
			var image = data.entities.get(entity, "image");
			image.sourceX = 0;
	},"play_btn");
};
