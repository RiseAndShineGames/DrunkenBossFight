"use strict";

module.exports = function(player,data) { // eslint-disable-line no-unused-vars
	var timers = data.entities.get(player,"timers");
	data.entities.set(player,"health",data.entities.get(player,"health")-1);
	timers.sobriety.time = 0;
	timers.sobriety.running = true;
};