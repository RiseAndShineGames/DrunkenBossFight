"use strict";

module.exports = function(entity,data) { // eslint-disable-line no-unused-vars
	var timers = data.entities.get(entity,"timers");
	console.log("arc fireball attack");
	timers.reload.time = 0;
	timers.reload.running = true;
	var match = data.entities.get(entity,"match");
	var animation = data.entities.get(match.id,"animation");

	animation.name="bear";
	
};