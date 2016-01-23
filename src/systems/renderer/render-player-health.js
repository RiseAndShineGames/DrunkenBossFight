"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#f7931e";
		var position = data.entities.get(5,"position");
		var height = 50 * data.entities.get(1,"health")/data.entities.get(1,"maxHealth");
		var healthx = position.x + 23;
		var healthy = position.y + 62 - height;
		var healthWidth = 42;
		context.fillRect(healthx,healthy, healthWidth, height);
		
	});
};