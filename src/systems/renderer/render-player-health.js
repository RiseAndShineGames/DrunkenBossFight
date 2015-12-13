"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#f7931e";
		var height = 50 * data.entities.entities[1].health/data.entities.entities[1].maxHealth;
		var healthx = data.entities.entities[5].position.x + 15;
		var healthy = data.entities.entities[5].position.y + 62 - height;
		var healthWidth = 38;
		context.fillRect(healthx,healthy, healthWidth, height);
		
	}, []);
};