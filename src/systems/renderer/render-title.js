"use strict";

module.exports = function(ecs, data) { // eslint-disable-line no-unused-vars
	ecs.add(function(entities, context) { // eslint-disable-line no-unused-vars
		context.fillStyle = "#302f2c";
		var size = data.entities.get(100,"size");
		context.drawImage(data.images.get("titlescreen"),0,0,data.canvas.width,data.canvas.height)
	});
};