"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#f7931e";
		var position = data.entities.get(5,"position");
		var size = data.entities.get(5,"size");
		var height = size.height*0.714 * data.entities.get(1,"health")/data.entities.get(1,"maxHealth");
		var healthx = position.x + size.width*0.25;
		var healthy = position.y + size.height*0.886 - height;
		var healthWidth = size.width * 0.63;
		context.fillRect(healthx,healthy, healthWidth, height);
		
	});
};