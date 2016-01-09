"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#fff";
		context.drawImage(data.images.get(data.entities.get(0,"image").name),0,0);
	});
};