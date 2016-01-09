"use strict";

module.exports = function(player,data) { // eslint-disable-line no-unused-vars
	data.entities.get(player,"animation").frame = 0;
	var timers = data.entities.get(player,"timers");
	timers.center.running = false;
	timers.center.time = 0;
	data.entities.set(player,"animationIndex",4);
};
