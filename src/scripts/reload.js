"use strict";

module.exports = function(gun,data) { // eslint-disable-line no-unused-vars
	data.entities.set(gun,"loaded",true);
	var timers = data.entities.get(gun,"timers");
	timers.reload.running = false;
	timers.reload.time = 0;
};
