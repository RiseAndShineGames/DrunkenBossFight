"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#302f2c";
		context.drawImage(data.images.get("gameOver"),0,0)
	});
};